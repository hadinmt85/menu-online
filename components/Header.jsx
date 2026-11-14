"use client";

import { useCart } from "./CartProvider";
import { cafe } from "@/lib/menu";
import { formatNumber } from "@/lib/format";

function CupMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-7 w-7">
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <path d="M10 20h24v9a10 10 0 0 1-10 10h-4A10 10 0 0 1 10 29v-9Z" />
        <path d="M34 23h3.5a5.5 5.5 0 0 1 0 11H34" />
        <path d="M16 13c0-2 2-2.6 2-4.6M23 13c0-2 2-2.6 2-4.6M30 13c0-2 2-2.6 2-4.6" opacity=".45" />
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
    <header className="absolute inset-x-0 top-0 z-40 text-cream">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80">
          <CupMark />
          <strong className="font-display text-xl leading-none sm:text-2xl">{cafe.name}</strong>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="ناوبری اصلی">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-1 text-[13px] font-light text-cream/70 transition-colors duration-200 hover:border-copper hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="relative inline-flex items-center gap-2 rounded-full border border-cream/35 px-4 py-2 text-[13px] font-light text-cream transition-colors duration-200 hover:border-cream hover:bg-cream/5"
          onClick={openCart}
          aria-label={
            count > 0
              ? `سبد سفارش، ${formatNumber(count)} قلم، ${formatNumber(total)} تومان`
              : "سبد سفارش"
          }
        >
          <span className="hidden sm:inline">
            {count > 0 ? (
              <>
                <span className="font-price font-bold">{formatNumber(total)}</span>
                <span className="ms-1 text-cream/60">تومان</span>
              </>
            ) : (
              "سبد سفارش"
            )}
          </span>
          <span className="sm:hidden">سبد</span>
          {count > 0 && (
            <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-copper px-1 text-[10px] font-bold text-cream">
              {formatNumber(count)}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
