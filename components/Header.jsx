"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { cafe } from "@/lib/menu";
import { formatNumber } from "@/lib/format";

function CupMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-6 w-6">
      <g fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
        <path d="M10 20h24v9a10 10 0 0 1-10 10h-4A10 10 0 0 1 10 29v-9Z" />
        <path d="M34 23h3.5a5.5 5.5 0 0 1 0 11H34" />
        <path d="M16 13c0-2 2-2.6 2-4.6M23 13c0-2 2-2.6 2-4.6M30 13c0-2 2-2.6 2-4.6" opacity=".5" />
      </g>
    </svg>
  );
}

const navLinks = [
  { href: "#menu", label: "منو" },
  { href: "#about", label: "درباره ما" },
  { href: "#contact", label: "تماس" },
];

export default function Header() {
  const { count, openCart, total } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <a href="#top" className="group flex shrink-0 items-center gap-2.5 sm:gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-espresso text-cream shadow-soft transition-colors duration-300 group-hover:bg-copper-dark sm:h-11 sm:w-11">
            <CupMark />
          </span>
          <span className="flex flex-col gap-0.5 leading-none">
            <strong className="font-display text-lg tracking-tight text-espresso sm:text-xl">
              {cafe.name}
            </strong>
            <small className="hidden text-[11px] font-normal text-muted sm:block">
              {cafe.tagline}
            </small>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="ناوبری اصلی">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-espresso/75 transition-colors duration-200 hover:bg-sand hover:text-espresso focus-visible:bg-sand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="group relative inline-flex items-center gap-2 rounded-full bg-espresso px-3.5 py-2.5 text-sm font-semibold text-cream shadow-soft transition-all duration-300 hover:bg-copper-dark hover:shadow-card sm:px-5"
          onClick={openCart}
          aria-label={`سبد سفارش، ${formatNumber(count)} قلم`}
        >
          <ShoppingBag
            aria-hidden="true"
            className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-rotate-6"
          />
          <span className="hidden items-baseline gap-1 sm:inline-flex">
            {count > 0 ? (
              <>
                <span className="tabular-nums">{formatNumber(total)}</span>
                <span className="text-[11px] font-normal text-cream/70">تومان</span>
              </>
            ) : (
              "سبد سفارش"
            )}
          </span>
          {count > 0 && (
            <span className="absolute -top-1.5 -end-1.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-copper px-1 text-[11px] font-bold text-white ring-2 ring-cream">
              {formatNumber(count)}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
