"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, Clock3, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatNumber, formatPrice, formatPhone, toEnDigits } from "@/lib/format";
import { TAX_RATE } from "@/lib/menu";

const initialForm = { name: "", phone: "", type: "dine-in", table: "", note: "" };

const inputClass =
  "w-full rounded-xl border border-espresso/15 bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-all duration-200 placeholder:text-muted/60 focus:border-copper focus:bg-white focus:ring-4 focus:ring-copper/15";

export default function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    tax,
    total,
    isOpen,
    closeCart,
    add,
    decrement,
    remove,
    clear,
  } = useCart();

  const [step, setStep] = useState("cart");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [order, setOrder] = useState(null);

  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    const timer = setTimeout(() => closeRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (!isOpen) {
      setServerError("");
    }
  }, [isOpen]);

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setServerError("");
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "نام را کامل وارد کن.";
    const phone = toEnDigits(form.phone).replace(/\D/g, "");
    if (!/^09\d{9}$/.test(phone)) next.phone = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.";
    if (form.type === "dine-in" && form.table.trim() === "") next.table = "شماره میز را وارد کن.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((line) => ({ id: line.id, qty: line.qty })),
          customer: { name: form.name.trim(), phone: toEnDigits(form.phone).replace(/\D/g, "") },
          type: form.type,
          table: form.type === "dine-in" ? form.table.trim() : "",
          note: form.note.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        setServerError(data?.message || "ثبت سفارش انجام نشد. کمی بعد دوباره تلاش کن.");
        return;
      }

      setOrder(data.order);
      clear();
      setStep("done");
      setForm(initialForm);
    } catch {
      setServerError("ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی کن.");
    } finally {
      setSubmitting(false);
    }
  };

  const startNewOrder = () => {
    setOrder(null);
    setStep("cart");
    setErrors({});
    setServerError("");
  };

  const handleClose = () => {
    closeCart();
    if (step === "done") startNewOrder();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-espresso/45 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <aside
        ref={panelRef}
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-lift transition-[transform,visibility] duration-[420ms] ease-smooth ${
          isOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="سبد سفارش"
        aria-hidden={!isOpen}
      >
        <header className="flex items-start justify-between gap-3 border-b border-espresso/10 bg-cream/95 px-5 py-4 backdrop-blur">
          <div>
            <h2 className="font-display text-xl leading-7 text-espresso">
              {step === "done" ? "سفارش ثبت شد" : step === "checkout" ? "تکمیل سفارش" : "سبد سفارش"}
            </h2>
            {step !== "done" && (
              <p className="mt-0.5 text-xs text-muted">
                {count > 0 ? `${formatNumber(count)} قلم در سبد` : "سبد خالی است"}
              </p>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-espresso/15 text-espresso transition-colors duration-200 hover:border-copper/40 hover:bg-sand"
            onClick={handleClose}
            aria-label="بستن سبد"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </header>

        {step === "done" && order ? (
          <div className="flex flex-1 flex-col items-center overflow-y-auto px-5 pb-6 pt-10 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-olive/10 text-olive">
              <Check aria-hidden="true" className="h-8 w-8" strokeWidth={2.4} />
            </div>
            <h3 className="mt-4 font-display text-2xl text-espresso">ممنون از سفارشت!</h3>
            <p className="mt-2 max-w-[32ch] text-[13px] leading-7 text-muted">
              سفارش تو در صف آماده‌سازی قرار گرفت. با شماره‌ی پیگیری می‌توانی وضعیت را از باریستا
              بپرسی.
            </p>

            <div className="mt-6 flex w-full items-center justify-between gap-3 rounded-2xl border border-dashed border-copper/45 bg-copper-soft px-4 py-3.5">
              <span className="text-xs font-medium text-copper-dark">شماره پیگیری</span>
              <strong
                dir="ltr"
                className="text-lg font-black tracking-[0.14em] text-copper-dark"
              >
                {order.code}
              </strong>
            </div>

            <ul className="mt-4 w-full">
              <li className="flex items-center justify-between gap-3 border-b border-espresso/10 py-2.5 text-[13px] text-muted">
                <span>مبلغ پرداختی</span>
                <strong className="font-bold text-espresso">{formatPrice(order.total)}</strong>
              </li>
              <li className="flex items-center justify-between gap-3 border-b border-espresso/10 py-2.5 text-[13px] text-muted">
                <span>زمان تقریبی آماده‌سازی</span>
                <strong className="inline-flex items-center gap-1.5 font-bold text-espresso">
                  <Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-copper" />
                  {formatNumber(order.estimatedMinutes)} دقیقه
                </strong>
              </li>
              <li className="flex items-center justify-between gap-3 py-2.5 text-[13px] text-muted">
                <span>نوع سفارش</span>
                <strong className="font-bold text-espresso">
                  {order.type === "dine-in" ? `حضوری، میز ${order.table}` : "بیرون‌بر"}
                </strong>
              </li>
            </ul>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold text-cream shadow-card transition-all duration-300 hover:bg-copper-dark hover:shadow-lift"
              onClick={startNewOrder}
            >
              سفارش جدید
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain px-5">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center px-2 py-16 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-sand text-copper-dark">
                    <ShoppingBag aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 font-display text-xl text-espresso">سبدت خالی است</h3>
                  <p className="mt-1.5 max-w-[28ch] text-[13px] leading-7 text-muted">
                    از منو یکی از نوشیدنی‌ها یا شیرینی‌ها را انتخاب کن.
                  </p>
                  <button
                    type="button"
                    className="mt-5 rounded-full border border-espresso/20 px-5 py-2.5 text-[13px] font-semibold text-espresso transition-colors duration-200 hover:border-espresso/40 hover:bg-white/60"
                    onClick={handleClose}
                  >
                    دیدن منو
                  </button>
                </div>
              ) : (
                <>
                  {step === "cart" ? (
                    <ul>
                      {lines.map((line) => (
                        <li
                          key={line.id}
                          className="flex gap-3 border-b border-dashed border-espresso/10 py-4 last:border-b-0"
                        >
                          <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-2xl ring-1 ring-espresso/5">
                            <Image
                              src={`/images/${line.item.image}.jpg`}
                              alt=""
                              fill
                              sizes="72px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-bold text-espresso">{line.item.name}</h3>
                              <button
                                type="button"
                                className="-me-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-copper/10 hover:text-copper-dark"
                                onClick={() => remove(line.id)}
                                aria-label={`حذف ${line.item.name}`}
                              >
                                <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-[11px] text-muted">
                              {formatPrice(line.item.price)}
                            </span>

                            <div className="mt-2 flex items-center justify-between gap-2">
                              <div
                                className="inline-flex items-center gap-0.5 rounded-full border border-espresso/15 bg-white/70 p-0.5"
                                role="group"
                                aria-label={`تعداد ${line.item.name}`}
                              >
                                <button
                                  type="button"
                                  onClick={() => decrement(line.id)}
                                  aria-label={`کم کردن ${line.item.name}`}
                                  className="grid h-6 w-6 place-items-center rounded-full text-espresso transition-colors duration-200 hover:bg-sand"
                                >
                                  −
                                </button>
                                <span className="min-w-5 text-center text-xs font-bold tabular-nums text-espresso">
                                  {formatNumber(line.qty)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => add(line.id)}
                                  aria-label={`زیاد کردن ${line.item.name}`}
                                  className="grid h-6 w-6 place-items-center rounded-full text-espresso transition-colors duration-200 hover:bg-sand"
                                >
                                  +
                                </button>
                              </div>
                              <strong className="text-[13px] font-bold tabular-nums text-espresso">
                                {formatPrice(line.total)}
                              </strong>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <form id="checkout-form" className="grid gap-4 pb-2 pt-5" onSubmit={submit} noValidate>
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-[13px] font-semibold text-espresso">
                          نام و نام خانوادگی
                        </label>
                        <input
                          id="name"
                          value={form.name}
                          onChange={(event) => update("name", event.target.value)}
                          placeholder="مثلاً سارا احمدی"
                          aria-invalid={Boolean(errors.name)}
                          autoComplete="name"
                          className={inputClass}
                        />
                        {errors.name && (
                          <span className="mt-1 block text-xs text-[#A83A1E]">{errors.name}</span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-[13px] font-semibold text-espresso">
                          شماره موبایل
                        </label>
                        <input
                          id="phone"
                          value={form.phone}
                          onChange={(event) => update("phone", formatPhone(event.target.value))}
                          placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
                          inputMode="tel"
                          aria-invalid={Boolean(errors.phone)}
                          autoComplete="tel"
                          dir="ltr"
                          className={`${inputClass} text-right tracking-wide`}
                        />
                        {errors.phone && (
                          <span className="mt-1 block text-xs text-[#A83A1E]">{errors.phone}</span>
                        )}
                      </div>

                      <fieldset>
                        <legend className="mb-1.5 block text-[13px] font-semibold text-espresso">
                          نوع سفارش
                        </legend>
                        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-espresso/15 bg-sand/70 p-1">
                          <label
                            className={`cursor-pointer rounded-xl px-3 py-2 text-center text-[13px] transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-copper ${
                              form.type === "dine-in"
                                ? "bg-cream font-bold text-espresso shadow-soft"
                                : "text-muted hover:text-espresso"
                            }`}
                          >
                            <input
                              type="radio"
                              name="type"
                              value="dine-in"
                              checked={form.type === "dine-in"}
                              onChange={() => update("type", "dine-in")}
                              className="pointer-events-none absolute opacity-0"
                            />
                            در کافه
                          </label>
                          <label
                            className={`cursor-pointer rounded-xl px-3 py-2 text-center text-[13px] transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-copper ${
                              form.type === "takeaway"
                                ? "bg-cream font-bold text-espresso shadow-soft"
                                : "text-muted hover:text-espresso"
                            }`}
                          >
                            <input
                              type="radio"
                              name="type"
                              value="takeaway"
                              checked={form.type === "takeaway"}
                              onChange={() => update("type", "takeaway")}
                              className="pointer-events-none absolute opacity-0"
                            />
                            بیرون‌بر
                          </label>
                        </div>
                      </fieldset>

                      {form.type === "dine-in" && (
                        <div>
                          <label htmlFor="table" className="mb-1.5 block text-[13px] font-semibold text-espresso">
                            شماره میز
                          </label>
                          <input
                            id="table"
                            value={form.table}
                            onChange={(event) => update("table", event.target.value)}
                            placeholder="مثلاً ۴"
                            inputMode="numeric"
                            aria-invalid={Boolean(errors.table)}
                            className={inputClass}
                          />
                          {errors.table && (
                            <span className="mt-1 block text-xs text-[#A83A1E]">{errors.table}</span>
                          )}
                        </div>
                      )}

                      <div>
                        <label htmlFor="note" className="mb-1.5 block text-[13px] font-semibold text-espresso">
                          توضیحات (اختیاری)
                        </label>
                        <textarea
                          id="note"
                          rows={3}
                          value={form.note}
                          onChange={(event) => update("note", event.target.value)}
                          placeholder="مثلاً شیر بدون لاکتوز، شکر جدا…"
                          className={`${inputClass} resize-y leading-7`}
                        />
                      </div>

                      {serverError && (
                        <p
                          className="rounded-xl border border-[#E7BBAE] bg-[#FBEDE8] px-4 py-2.5 text-xs leading-6 text-[#8F3418]"
                          role="alert"
                        >
                          {serverError}
                        </p>
                      )}
                    </form>
                  )}
                </>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-espresso/10 bg-cream px-5 pb-5 pt-4 shadow-[0_-14px_30px_-24px_rgba(59,36,24,0.55)]">
                <dl className="mb-3.5 grid gap-1.5">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <dt>جمع اقلام</dt>
                    <dd className="tabular-nums text-espresso">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <dt>مالیات و خدمات ({formatNumber(Math.round(TAX_RATE * 100))}٪)</dt>
                    <dd className="tabular-nums text-espresso">{formatPrice(tax)}</dd>
                  </div>
                  <div className="mt-1 flex items-center justify-between border-t border-espresso/10 pt-2 text-sm font-bold text-espresso">
                    <dt>قابل پرداخت</dt>
                    <dd className="text-base font-black tabular-nums">{formatPrice(total)}</dd>
                  </div>
                </dl>

                {step === "cart" ? (
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-full bg-espresso px-6 py-3.5 text-sm font-semibold text-cream shadow-card transition-all duration-300 hover:bg-copper-dark hover:shadow-lift"
                    onClick={() => setStep("checkout")}
                  >
                    ادامه و تکمیل اطلاعات
                  </button>
                ) : (
                  <div className="grid grid-cols-[auto_1fr] gap-2.5">
                    <button
                      type="button"
                      className="rounded-full border border-espresso/20 px-4 py-3 text-[13px] font-semibold text-espresso transition-colors duration-200 hover:border-espresso/40 hover:bg-white/60"
                      onClick={() => setStep("cart")}
                    >
                      بازگشت
                    </button>
                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={submitting}
                      className="inline-flex items-center justify-center rounded-full bg-espresso px-5 py-3 text-sm font-semibold text-cream shadow-card transition-all duration-300 hover:bg-copper-dark hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? "در حال ثبت…" : "ثبت نهایی سفارش"}
                    </button>
                  </div>
                )}
              </footer>
            )}
          </>
        )}
      </aside>
    </>
  );
}
