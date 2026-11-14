"use client";

import { useCart } from "./CartProvider";
import { formatNumber, formatPrice } from "@/lib/format";

export default function CartToast() {
  const { toast } = useCart();

  return (
    <div
      className={`fixed bottom-20 left-1/2 z-[60] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-full bg-espresso px-4 py-2.5 text-[12px] font-light text-cream transition-all duration-300 ease-smooth md:bottom-6 ${
        toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
      {toast ? <span>«{toast.name}» به سبد اضافه شد</span> : <span>&nbsp;</span>}
    </div>
  );
}

export function MobileCartBar() {
  const { count, total, openCart } = useCart();
  if (count === 0) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-30 md:inset-x-auto md:end-6 md:bottom-6">
      <button
        type="button"
        onClick={openCart}
        className="flex w-full items-center gap-2.5 rounded-full bg-mocha px-5 py-3 text-[13px] font-light text-cream transition-colors duration-200 hover:bg-espresso md:w-auto"
      >
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cream/20 text-[11px] font-bold">
          {formatNumber(count)}
        </span>
        <span>مشاهده سبد</span>
        <strong className="price ms-auto text-[13px] md:ms-3">{formatPrice(total)}</strong>
      </button>
    </div>
  );
}
