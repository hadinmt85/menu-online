"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatNumber, formatPrice } from "@/lib/format";

export default function CartToast() {
  const { toast } = useCart();

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[60] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-full bg-espresso px-4 py-2.5 text-xs text-cream shadow-lift transition-all duration-300 ease-smooth ${
        toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cream/15 text-copper-light">
        <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
      </span>
      {toast ? <span>«{toast.name}» به سبد اضافه شد</span> : <span>&nbsp;</span>}
    </div>
  );
}

export function MobileCartBar() {
  const { count, total, openCart } = useCart();
  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-cream via-cream/90 to-transparent px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-8 md:hidden">
      <button
        type="button"
        onClick={openCart}
        className="flex w-full items-center gap-2.5 rounded-full bg-espresso px-4 py-3 text-sm font-semibold text-cream shadow-lift transition-colors duration-200 active:bg-copper-dark"
      >
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-copper text-[11px] font-bold text-white">
          {formatNumber(count)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShoppingBag aria-hidden="true" className="h-4 w-4" />
          مشاهده سبد
        </span>
        <strong className="ms-auto text-[13px] font-bold tabular-nums text-copper-light">
          {formatPrice(total)}
        </strong>
      </button>
    </div>
  );
}
