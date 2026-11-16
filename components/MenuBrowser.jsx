"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, getItem, menuItems } from "@/lib/menu";
import { formatNumber, formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";

const signatureIds = ["matcha", "icematcha", "chamomile", "herbaltea", "greentea", "blacktea"];

const categoryLabel = (id) => categories.find((category) => category.id === id)?.label ?? "";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" strokeLinecap="round" />
    </svg>
  );
}

function Stepper({ qty, onAdd, onDec, onInc, name }) {
  if (qty === 0) {
    return (
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full bg-copper/15 px-3.5 py-2 text-[11.5px] font-medium text-copperDeep transition-all duration-200 hover:bg-copperDeep hover:text-cream active:scale-95"
        onClick={onAdd}
        aria-label={`افزودن ${name} به سبد`}
      >
        <span aria-hidden="true" className="text-[14px] leading-none">
          +
        </span>
        افزودن
      </button>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-espresso/15 bg-cream p-1"
      role="group"
      aria-label={`تعداد ${name}`}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label={`کم کردن ${name}`}
        className="grid h-6 w-6 place-items-center rounded-full bg-plate text-[13px] leading-none text-espresso transition-colors duration-200 hover:bg-espresso hover:text-cream"
      >
        −
      </button>
      <span aria-live="polite" className="min-w-5 text-center text-[12px] font-bold tabular-nums">
        {formatNumber(qty)}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label={`زیاد کردن ${name}`}
        className="grid h-6 w-6 place-items-center rounded-full bg-plate text-[13px] leading-none text-espresso transition-colors duration-200 hover:bg-espresso hover:text-cream"
      >
        +
      </button>
    </div>
  );
}

function ProductCard({ item, qty, add, increment, decrement }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-cream shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-copper/30 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-plate">
        <Image
          src={`/images/${item.image}.jpg`}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.05]"
        />
        {item.tags.length > 0 && (
          <div className="absolute end-3 top-3 flex flex-col items-end gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-medium shadow-soft backdrop-blur ${
                  tag === "پرفروش" ? "text-copperDeep" : "text-olive"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15.5px] font-bold text-espresso">{item.name}</h3>
        <p className="mt-1.5 line-clamp-2 min-h-[2.9em] text-[12px] font-light leading-7 text-muted">
          {item.desc}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-dashed border-espresso/15 pt-3.5">
          <span className="price text-[13px] text-espresso">{formatPrice(item.price)}</span>
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
    <section id="menu" className="relative bg-plate py-16 sm:py-20" aria-labelledby="menu-title">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-espresso/15 bg-cream/70 px-3.5 py-1 text-[11px] font-medium text-copperDeep">
              <span aria-hidden="true">☕</span>
              منوی کافه
            </span>
            <h2
              id="menu-title"
              className="mt-3 font-display text-[30px] leading-snug text-espresso sm:text-[42px]"
            >
              امروز چی میل داری؟
            </h2>
          </div>

          <label className="flex w-full items-center gap-2 rounded-full border border-espresso/15 bg-cream/85 px-4 py-2.5 text-muted transition-colors duration-200 focus-within:border-copper focus-within:bg-cream focus-within:ring-4 focus-within:ring-copper/15 sm:w-auto sm:min-w-[260px]">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جست‌وجو در منو…"
              aria-label="جست‌وجو در منو"
              className="w-full bg-transparent text-[13px] font-light text-ink outline-none placeholder:text-muted/70"
            />
          </label>
        </div>

        {/* فنجان‌های امضا */}
        <div className="sig mt-8">
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
                <span className="relative h-[74px] w-[74px] overflow-hidden rounded-full border-[3px] border-cream shadow-soft sm:h-[5.75rem] sm:w-[5.75rem]">
                  <Image
                    src={`/images/${item.image}.jpg`}
                    alt=""
                    fill
                    sizes="92px"
                    className="object-cover"
                  />
                </span>
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
              className="sig-panel mt-7 grid-cols-1 items-center gap-5 rounded-3xl border border-espresso/10 bg-cream p-5 shadow-soft sm:grid-cols-[180px_1fr_auto] sm:gap-7 sm:p-6"
            >
              <div className="w-36 sm:w-full">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-plate">
                  <Image
                    src={`/images/${item.image}.jpg`}
                    alt={item.name}
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-display text-2xl leading-snug text-espresso">{item.name}</h3>
                <p className="mt-1 text-[11px] tracking-[0.1em] text-copperDeep">
                  {categoryLabel(item.category)}
                </p>
                <p className="mt-2.5 max-w-xl text-[12.5px] font-light leading-7 text-muted">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-end justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
                <span className="price text-[22px] text-espresso">{formatPrice(item.price)}</span>
                <button
                  type="button"
                  onClick={() => add(item.id)}
                  className="rounded-full bg-copperDeep px-5 py-2.5 text-[12px] font-medium text-cream transition-colors duration-200 hover:bg-mocha"
                >
                  افزودن به سبد
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* دسته‌بندی‌ها */}
        <div className="no-scrollbar mt-9 flex gap-2.5 overflow-x-auto pb-1" role="tablist" aria-label="دسته‌بندی منو">
          {tabs.map((tab) => {
            const isActive = active === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[12.5px] transition-all duration-200 ${
                  isActive
                    ? "border-espresso bg-espresso text-cream shadow-card"
                    : "border-espresso/15 bg-cream/70 text-espresso/75 hover:border-copper/40 hover:bg-cream hover:text-copperDeep"
                }`}
                onClick={() => setActive(tab.id)}
              >
                <span aria-hidden="true" className="text-[13px]">
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

        <p className="mt-10 text-center text-[11px] font-light leading-6 text-muted">
          همه‌ی قیمت‌ها به تومان است و ۹٪ مالیات بر ارزش افزوده در فاکتور محاسبه می‌شود.
        </p>
      </div>
    </section>
  );
}
