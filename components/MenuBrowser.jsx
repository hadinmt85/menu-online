"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  CakeSlice,
  Coffee,
  CupSoda,
  Leaf,
  Minus,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { categories, menuItems } from "@/lib/menu";
import { formatNumber, formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";

const tabIcons = {
  all: Sparkles,
  hot: Coffee,
  cold: CupSoda,
  tea: Leaf,
  pastry: CakeSlice,
};

const badgeTone = {
  پرفروش: "text-copper-dark",
  جدید: "text-olive",
  گیاهی: "text-olive",
};

function Stepper({ qty, onAdd, onDec, onInc, name }) {
  if (qty === 0) {
    return (
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full bg-copper/10 px-3.5 py-2 text-xs font-bold text-copper-dark transition-all duration-200 hover:bg-copper hover:text-white active:scale-95"
        onClick={onAdd}
        aria-label={`افزودن ${name} به سبد`}
      >
        <Plus aria-hidden="true" className="h-3.5 w-3.5" />
        افزودن
      </button>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-espresso/15 bg-cream p-1 shadow-sm"
      role="group"
      aria-label={`تعداد ${name}`}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label={`کم کردن ${name}`}
        className="grid h-7 w-7 place-items-center rounded-full bg-sand text-espresso transition-colors duration-200 hover:bg-espresso hover:text-cream"
      >
        <Minus aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
      <span aria-live="polite" className="min-w-6 text-center text-[13px] font-bold tabular-nums text-espresso">
        {formatNumber(qty)}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label={`زیاد کردن ${name}`}
        className="grid h-7 w-7 place-items-center rounded-full bg-sand text-espresso transition-colors duration-200 hover:bg-espresso hover:text-cream"
      >
        <Plus aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function ProductCard({ item, qty, add, increment, decrement }) {
  const featured = item.tags.includes("پرفروش");

  return (
    <article className="group mb-5 break-inside-avoid overflow-hidden rounded-3xl border border-espresso/10 bg-cream shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-copper/30 hover:shadow-card">
      <div className={`relative overflow-hidden ${featured ? "aspect-[4/4.6]" : "aspect-[4/3]"}`}>
        <Image
          src={`/images/${item.image}.jpg`}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-espresso/30 to-transparent"
        />
        {item.tags.length > 0 && (
          <div className="absolute end-3 top-3 flex flex-col items-end gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold shadow-soft backdrop-blur ${
                  badgeTone[tag] ?? "text-copper-dark"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-[19px] leading-7 text-espresso">{item.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-7 text-muted">{item.desc}</p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-dashed border-espresso/10 pt-3.5">
          <span className="text-sm font-bold tabular-nums text-espresso">
            {formatPrice(item.price)}
          </span>
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

  return (
    <section id="menu" className="relative bg-sand" aria-labelledby="menu-title">
      <div className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-espresso/15 bg-cream/70 px-3.5 py-1 text-[11px] font-medium text-copper-dark">
              <Coffee aria-hidden="true" className="h-3.5 w-3.5" />
              منوی کافه
            </span>
            <h2
              id="menu-title"
              className="mt-3 font-display text-[1.75rem] leading-snug text-espresso sm:text-4xl"
            >
              امروز چی میل داری؟
            </h2>
          </div>

          <label className="relative flex w-full items-center gap-2 rounded-full border border-espresso/15 bg-cream/80 px-4 py-2.5 text-muted transition-colors duration-200 focus-within:border-copper focus-within:bg-cream focus-within:ring-4 focus-within:ring-copper/15 sm:w-auto sm:min-w-[17rem]">
            <Search aria-hidden="true" className="h-4 w-4 shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جست‌وجو در منو…"
              aria-label="جست‌وجو در منو"
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted/70"
            />
          </label>
        </div>
      </div>

      <div className="sticky top-16 z-30 mt-6 border-y border-espresso/5 bg-sand/90 backdrop-blur-md sm:top-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="no-scrollbar flex gap-2 overflow-x-auto py-3" role="tablist" aria-label="دسته‌بندی منو">
            {tabs.map((tab) => {
              const Icon = tabIcons[tab.id] ?? Sparkles;
              const isActive = active === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "border-espresso bg-espresso text-cream shadow-card"
                      : "border-espresso/15 bg-cream/70 text-espresso/75 hover:border-copper/40 hover:bg-cream hover:text-espresso"
                  }`}
                  onClick={() => setActive(tab.id)}
                >
                  <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 lg:px-8">
        {filtered.length > 0 ? (
          <div className="[column-gap:1.25rem] sm:columns-2 lg:columns-3">
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
          <div className="rounded-3xl border border-dashed border-espresso/20 bg-cream/60 px-6 py-16 text-center">
            <Coffee aria-hidden="true" className="mx-auto h-9 w-9 text-copper/60" />
            <h3 className="mt-4 font-display text-xl text-espresso">چیزی پیدا نشد</h3>
            <p className="mt-1 text-sm text-muted">
              عبارت دیگری را جست‌وجو کن یا دسته‌بندی را عوض کن.
            </p>
          </div>
        )}

        <p className="mt-10 text-center text-xs leading-6 text-muted">
          همه‌ی قیمت‌ها به تومان است و ۹٪ مالیات بر ارزش افزوده در فاکتور محاسبه می‌شود.
        </p>
      </div>
    </section>
  );
}
