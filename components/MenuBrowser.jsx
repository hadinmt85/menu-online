"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, getItem, menuItems } from "@/lib/menu";
import { formatNumber, formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";
import CupArt from "./CupArt";

const signatureIds = ["matcha", "icematcha", "chamomile", "herbaltea", "greentea", "blacktea"];

const categoryLabel = (id) => categories.find((category) => category.id === id)?.label ?? "";

function Stepper({ qty, onAdd, onDec, onInc, name }) {
  if (qty === 0) {
    return (
      <button
        type="button"
        className="border-b border-copper/50 pb-0.5 text-[12px] font-light text-copper transition-colors duration-200 hover:border-copper hover:text-mocha"
        onClick={onAdd}
        aria-label={`افزودن ${name} به سبد`}
      >
        افزودن
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label={`تعداد ${name}`}>
      <button
        type="button"
        onClick={onDec}
        aria-label={`کم کردن ${name}`}
        className="grid h-6 w-6 place-items-center rounded-full border border-espresso/25 text-[13px] leading-none text-espresso transition-colors duration-200 hover:border-espresso hover:bg-plate"
      >
        −
      </button>
      <span aria-live="polite" className="min-w-4 text-center text-[12px] font-medium tabular-nums">
        {formatNumber(qty)}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label={`زیاد کردن ${name}`}
        className="grid h-6 w-6 place-items-center rounded-full border border-espresso/25 text-[13px] leading-none text-espresso transition-colors duration-200 hover:border-espresso hover:bg-plate"
      >
        +
      </button>
    </div>
  );
}

function ProductCard({ item, qty, add, increment, decrement }) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="cup-cell w-full max-w-[152px] sm:max-w-[210px] lg:max-w-[240px]">
        <div className="relative aspect-square w-full overflow-hidden rounded-full border border-espresso/10 bg-plate">
          <Image
            src={`/images/${item.image}.jpg`}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 240px"
            className="object-cover"
          />
        </div>
      </div>
      <h3 className="mt-4 text-[14px] font-medium text-espresso">{item.name}</h3>
      <span className="price mt-1 text-[14px] text-espresso/80">{formatPrice(item.price)}</span>
      <div className="mt-3">
        <Stepper
          qty={qty}
          name={item.name}
          onAdd={() => add(item.id)}
          onInc={() => increment(item.id)}
          onDec={() => decrement(item.id)}
        />
      </div>
    </article>
  );
}

export default function MenuBrowser() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const { quantityOf, add, increment, decrement } = useCart();

  const filtered = useMemo(() => {
    const q = query.trim();
    return menuItems.filter((item) => {
      const matchCategory = active === "all" || item.category === active;
      const matchQuery = q === "" || item.name.includes(q) || item.desc.includes(q);
      return matchCategory && matchQuery;
    });
  }, [active, query]);

  const tabs = [{ id: "all", label: "همه", icon: "✦" }, ...categories];
  const signature = signatureIds.map(getItem).filter(Boolean);

  return (
    <section id="menu" className="relative bg-cream pb-16 pt-16 sm:pb-20 sm:pt-24" aria-labelledby="menu-title">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="menu-title"
            className="font-display text-[34px] leading-[1.5] text-espresso sm:text-[46px]"
          >
            چی روی میزته<span className="text-copper">؟</span>
          </h2>
          <p className="mt-2 text-[13px] font-light text-muted sm:text-sm">
            یک فنجان انتخاب کن، بقیه‌اش با ما.
          </p>
        </div>

        <div className="sig mt-10 sm:mt-14">
          <div className="grid grid-cols-3 gap-y-9 sm:grid-cols-6 sm:gap-x-3">
            {signature.map((item) => (
              <label
                key={item.id}
                data-cup={item.id}
                className="cup-cell flex cursor-pointer flex-col items-center gap-3"
              >
                <input
                  type="radio"
                  name="signature-cup"
                  id={`sig-${item.id}`}
                  defaultChecked={item.id === signature[0].id}
                  className="sr-only"
                />
                <CupArt item={item} className="h-16 w-16 sm:h-[5.5rem] sm:w-[5.5rem]" />
                <span className="cup-name text-[12px] font-light text-espresso/75 sm:text-[13px]">
                  {item.name}
                </span>
              </label>
            ))}

            {signature.map((item) => (
              <div
                key={item.id}
                data-cup={item.id}
                className="sig-panel col-span-3 mt-6 grid-cols-1 items-center gap-6 border-y border-espresso/15 py-7 sm:col-span-6 sm:mt-8 sm:grid-cols-[1fr_auto] sm:gap-10"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-espresso/10 sm:h-20 sm:w-20">
                    <Image
                      src={`/images/${item.image}.jpg`}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl leading-snug text-espresso sm:text-3xl">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-light tracking-wide text-copper">
                      {categoryLabel(item.category)}
                    </p>
                    <p className="mt-3 max-w-lg text-[13px] font-light leading-7 text-muted">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-6 sm:flex-col sm:items-end sm:gap-4">
                  <span className="price text-xl text-espresso sm:text-2xl">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => add(item.id)}
                    className="rounded-full bg-copper px-6 py-2.5 text-[13px] font-light text-cream transition-colors duration-200 hover:bg-mocha"
                  >
                    افزودن به سبد
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div className="border-t border-espresso/15 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
            <div className="no-scrollbar flex gap-6 overflow-x-auto" role="tablist" aria-label="دسته‌بندی منو">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active === tab.id}
                  className={`shrink-0 border-b pb-1.5 text-[13px] font-light transition-colors duration-200 ${
                    active === tab.id
                      ? "border-copper text-espresso"
                      : "border-transparent text-muted hover:text-espresso"
                  }`}
                  onClick={() => setActive(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <label className="flex w-full items-center border-b border-espresso/20 pb-1.5 sm:w-56">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="جست‌وجو"
                aria-label="جست‌وجو در منو"
                className="w-full bg-transparent text-[13px] font-light text-ink outline-none placeholder:text-muted/70"
              />
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-16">
              {filtered.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  qty={quantityOf(item.id)}
                  add={add}
                  increment={increment}
                  decrement={decrement}
                />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-sm font-light text-muted">
              چیزی پیدا نشد. عبارت یا دسته‌ی دیگری را امتحان کن.
            </p>
          )}

          <p className="mt-14 text-center text-[11px] font-light leading-6 text-muted">
            همه‌ی قیمت‌ها به تومان است و ۹٪ مالیات بر ارزش افزوده در فاکتور محاسبه می‌شود.
          </p>

          <p className="mt-3 text-center">
            <a
              href="/mockup"
              className="border-b border-espresso/30 pb-0.5 text-[11px] font-light text-espresso transition-colors duration-200 hover:border-espresso"
            >
              یک نمونه‌ی چیدمان دیگر برای همین منو
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
