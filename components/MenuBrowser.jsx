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
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-copperDeep px-4 py-2.5 text-[12px] font-medium text-cream transition-colors duration-200 hover:bg-mocha active:bg-espresso"
        onClick={onAdd}
        aria-label={`افزودن ${name} به سبد`}
      >
        <span aria-hidden="true" className="text-[14px] leading-none">
          +
        </span>
        افزودن به سبد
      </button>
    );
  }

  return (
    <div
      className="flex w-full items-center justify-between rounded-full border border-espresso/20 bg-cream px-1.5 py-1.5"
      role="group"
      aria-label={`تعداد ${name}`}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label={`کم کردن ${name}`}
        className="grid h-7 w-7 place-items-center rounded-full text-[14px] leading-none text-espresso transition-colors duration-200 hover:bg-plate"
      >
        −
      </button>
      <span aria-live="polite" className="text-[12px] font-medium tabular-nums">
        {formatNumber(qty)}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label={`زیاد کردن ${name}`}
        className="grid h-7 w-7 place-items-center rounded-full text-[14px] leading-none text-espresso transition-colors duration-200 hover:bg-plate"
      >
        +
      </button>
    </div>
  );
}

function ProductCard({ item, qty, add, increment, decrement }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-plate">
        <Image
          src={`/images/${item.image}.jpg`}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 360px"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.045]"
        />
        {item.tags.length > 0 && (
          <div className="absolute end-3 top-3 flex flex-col items-end gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-medium text-copperDeep shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-baseline gap-2.5">
          <h3 className="whitespace-nowrap font-display text-[17px] leading-7 text-espresso">
            {item.name}
          </h3>
          <span aria-hidden="true" className="mb-1 flex-1 border-b border-dotted border-espresso/25" />
          <span className="price whitespace-nowrap text-[13.5px] text-espresso">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="mt-1.5 text-[11px] font-light text-muted">
          {categoryLabel(item.category)}
          {item.tags.length > 0 ? ` · ${item.tags[0]}` : ""}
        </p>

        <div className="mt-auto pt-4">
          <Stepper
            qty={qty}
            name={item.name}
            onAdd={() => add(item.id)}
            onInc={() => increment(item.id)}
            onDec={() => decrement(item.id)}
          />
        </div>
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
    <section id="menu" className="relative bg-cream pb-16 pt-20 sm:pb-20 sm:pt-24" aria-labelledby="menu-title">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="flex items-center justify-center gap-3 text-[11px] tracking-[0.14em] text-muted">
            <span aria-hidden="true" className="block h-px w-7 bg-copper" />
            منوی کافه
          </p>
          <h2
            id="menu-title"
            className="mt-4 font-display text-[34px] leading-[1.45] text-espresso sm:text-[46px]"
          >
            چی روی میزته<span className="text-copper">؟</span>
          </h2>
          <p className="mt-3 text-[13px] font-light leading-7 text-muted">
            {formatNumber(menuItems.length)} آیتم در {formatNumber(categories.length)} دسته؛ یک فنجان
            انتخاب کن، بقیه‌اش با ما.
          </p>
        </div>

        {/* فنجان‌های امضا */}
        <div className="sig mt-12 border-y border-espresso/15 py-9 sm:mt-14">
          <div className="grid grid-cols-3 gap-y-8 sm:grid-cols-6">
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
          </div>

          {signature.map((item) => (
            <div
              key={item.id}
              data-cup={item.id}
              className="sig-panel mt-9 grid-cols-1 items-center gap-5 border-t border-espresso/15 pt-8 sm:grid-cols-[200px_1fr_auto] sm:gap-7"
            >
              <div className="w-40 sm:w-full">
                <div className="relative aspect-square overflow-hidden rounded-[20px] bg-plate">
                  <Image
                    src={`/images/${item.image}.jpg`}
                    alt={item.name}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl leading-snug text-espresso sm:text-[30px]">
                  {item.name}
                </h3>
                <p className="mt-1 text-[11px] tracking-[0.1em] text-copperDeep">
                  {categoryLabel(item.category)}
                </p>
                <p className="mt-3 max-w-xl text-[13px] font-light leading-8 text-muted">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-end justify-between gap-5 sm:flex-col sm:items-end sm:gap-3.5">
                <span className="price text-[26px] text-espresso">{formatPrice(item.price)}</span>
                <button
                  type="button"
                  onClick={() => add(item.id)}
                  className="rounded-full bg-copperDeep px-6 py-3 text-[13px] font-medium text-cream transition-colors duration-200 hover:bg-mocha"
                >
                  افزودن به سبد
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-b border-espresso/15 pb-3.5">
          <div className="no-scrollbar -mb-3.5 flex gap-6 overflow-x-auto" role="tablist" aria-label="دسته‌بندی منو">
            {tabs.map((tab) => {
              const isActive = active === tab.id;
              const tabCount =
                tab.id === "all"
                  ? menuItems.length
                  : menuItems.filter((item) => item.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`inline-flex shrink-0 items-baseline gap-1.5 border-b pb-3.5 text-[13px] transition-colors duration-200 ${
                    isActive
                      ? "border-copper font-medium text-espresso"
                      : "border-transparent font-light text-muted hover:text-espresso"
                  }`}
                  onClick={() => setActive(tab.id)}
                >
                  {tab.label}
                  <span aria-hidden="true" className="price text-[10px] text-muted">
                    {formatNumber(tabCount)}
                  </span>
                </button>
              );
            })}
          </div>

          <label className="flex w-full items-center gap-2 border-b border-espresso/20 pb-1.5 sm:w-52">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جست‌وجو در منو…"
              aria-label="جست‌وجو در منو"
              className="w-full bg-transparent text-[12.5px] font-light text-ink outline-none placeholder:text-muted/70"
            />
          </label>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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

        <p className="mt-12 text-center text-[11px] font-light leading-6 text-muted">
          همه‌ی قیمت‌ها به تومان است و ۹٪ مالیات بر ارزش افزوده در فاکتور محاسبه می‌شود.
        </p>
      </div>
    </section>
  );
}
