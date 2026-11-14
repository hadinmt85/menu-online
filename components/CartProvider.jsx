"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getItem, TAX_RATE } from "@/lib/menu";

const STORAGE_KEY = "cafe-note-cart-v1";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);

  // بازیابی سبد از حافظه‌ی مرورگر
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(
            parsed
              .filter((line) => line && getItem(line.id) && Number(line.qty) > 0)
              .map((line) => ({ id: line.id, qty: Math.min(99, Math.round(Number(line.qty))) }))
          );
        }
      }
    } catch {
      // داده‌ی خراب را نادیده بگیر
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // حافظه در دسترس نیست
    }
  }, [lines, ready]);

  // قفل کردن اسکرول هنگام باز بودن سبد
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const setQty = useCallback((id, qty) => {
    const next = Math.max(0, Math.min(99, Math.round(Number(qty) || 0)));
    setLines((current) => {
      if (next === 0) return current.filter((line) => line.id !== id);
      const found = current.find((line) => line.id === id);
      if (!found) return [...current, { id, qty: next }];
      return current.map((line) => (line.id === id ? { ...line, qty: next } : line));
    });
  }, []);

  const add = useCallback(
    (id, qty = 1) => {
      setLines((current) => {
        const found = current.find((line) => line.id === id);
        if (!found) return [...current, { id, qty: Math.min(99, qty) }];
        return current.map((line) =>
          line.id === id ? { ...line, qty: Math.min(99, line.qty + qty) } : line
        );
      });
      const item = getItem(id);
      if (item) setToast({ id, name: item.name });
    },
    []
  );

  const increment = useCallback((id) => {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, qty: Math.min(99, line.qty + 1) } : line))
    );
  }, []);

  const decrement = useCallback((id) => {
    setLines((current) =>
      current
        .map((line) => (line.id === id ? { ...line, qty: line.qty - 1 } : line))
        .filter((line) => line.qty > 0)
    );
  }, []);

  const remove = useCallback((id) => {
    setLines((current) => current.filter((line) => line.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const detailedLines = useMemo(
    () =>
      lines
        .map((line) => {
          const item = getItem(line.id);
          if (!item) return null;
          return { ...line, item, total: item.price * line.qty };
        })
        .filter(Boolean),
    [lines]
  );

  const count = useMemo(
    () => detailedLines.reduce((sum, line) => sum + line.qty, 0),
    [detailedLines]
  );
  const subtotal = useMemo(
    () => detailedLines.reduce((sum, line) => sum + line.total, 0),
    [detailedLines]
  );
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  const quantityOf = useCallback(
    (id) => lines.find((line) => line.id === id)?.qty ?? 0,
    [lines]
  );

  const value = {
    lines: detailedLines,
    count,
    subtotal,
    tax,
    total,
    ready,
    isOpen,
    openCart,
    closeCart,
    add,
    increment,
    decrement,
    remove,
    setQty,
    clear,
    quantityOf,
    toast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart باید داخل CartProvider استفاده شود");
  return context;
}
