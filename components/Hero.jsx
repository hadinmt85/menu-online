import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { cafe } from "@/lib/menu";
import { formatPrice } from "@/lib/format";

const highlights = [
  { title: "دانه‌ی تازه‌ی هفته", text: "رست‌مدیوم، مخصوص اسپرسو" },
  { title: "۳۰ دقیقه", text: "میانگین آماده‌سازی سفارش" },
  { title: "۷ صبح تا ۱۱ شب", text: "هر روز، حتی تعطیلات" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pb-16 pt-10 sm:pb-20 lg:pb-28 lg:pt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 end-[-14%] h-[30rem] w-[30rem] animate-drift rounded-full bg-copper/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 start-[-12%] h-[26rem] w-[26rem] rounded-full bg-olive/[0.08] blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-copper/25 bg-copper/10 px-4 py-1.5 text-xs font-medium text-copper-dark">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-copper opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-copper" />
            </span>
            منوی آنلاین {cafe.name}
          </span>

          <h1 className="mt-6 font-display text-[2.1rem] leading-[1.4] text-espresso sm:text-5xl sm:leading-[1.3] lg:text-[3.6rem]">
            قهوه‌ات را انتخاب کن،
            <br />
            <span className="text-copper">ما دم می‌کنیم.</span>
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-9 text-muted sm:text-base sm:leading-9">
            منوی کامل کافه را همین‌جا ببین، سفارشت را ثبت کن و سر میز یا دم در تحویل بگیر.
            بدون صف، بدون انتظار.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#menu"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-copper-dark hover:shadow-lift"
            >
              دیدن منو
              <ArrowDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-espresso/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-espresso transition-colors duration-300 hover:border-espresso/40 hover:bg-white/60"
            >
              <MapPin aria-hidden="true" className="h-4 w-4 text-copper-dark" />
              آدرس و ساعت کاری
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-espresso/10 pt-6 sm:gap-6">
            {highlights.map((item) => (
              <div key={item.title}>
                <dt className="text-[13px] font-bold text-espresso sm:text-sm">{item.title}</dt>
                <dd className="mt-1 text-[11px] leading-6 text-muted sm:text-xs">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[28rem] animate-fade-in lg:max-w-none">
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2.25rem] shadow-lift ring-1 ring-espresso/10 [border-start-start-radius:5.5rem]">
            <Image
              src="/images/cappuccino.jpg"
              alt="فنجان کاپوچینو با لاته آرت روی میز چوبی"
              fill
              priority
              sizes="(max-width: 900px) 92vw, 460px"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-5 start-2 flex items-center gap-3 rounded-2xl border border-sand-dark/80 bg-cream/95 p-2.5 pe-4 shadow-lift backdrop-blur sm:start-[-1.25rem]">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
              <Image src="/images/latte.jpg" alt="" fill sizes="48px" className="object-cover" />
            </div>
            <div className="leading-tight">
              <strong className="block text-[13px] font-bold text-espresso">کافه لاته</strong>
              <span className="text-[11px] text-muted">{formatPrice(98000)}</span>
            </div>
            <span className="ms-1 rounded-full bg-copper/15 px-2.5 py-1 text-[10px] font-bold text-copper-dark">
              پرفروش
            </span>
          </div>

          <div
            aria-hidden="true"
            className="absolute -top-4 end-[-0.75rem] hidden h-24 w-24 rotate-3 place-content-center rounded-full border border-dashed border-copper/40 bg-cream/95 text-center shadow-soft sm:grid"
          >
            <span className="text-[10px] text-muted">از ۱۳۹۴</span>
            <strong className="font-display text-[11px] leading-5 text-copper-dark">
              دم‌آوری
              <br />
              تازه
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
