import Image from "next/image";
import { cafe } from "@/lib/menu";
import { formatPrice } from "@/lib/format";

const highlights = [
  { title: "دانه‌ی تازه‌ی هفته", text: "رست‌مدیوم، مخصوص اسپرسو" },
  { title: "۳۰ دقیقه", text: "میانگین آماده‌سازی سفارش" },
  { title: "۷ صبح تا ۱۱ شب", text: "هر روز، حتی تعطیلات" },
];

function LatteArt({ className = "" }) {
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <g fill="none" stroke="#C4733B">
        <circle cx="300" cy="300" r="294" strokeOpacity="0.16" />
        <circle cx="300" cy="300" r="276" strokeOpacity="0.1" />
        <circle cx="300" cy="300" r="258" strokeOpacity="0.06" />
      </g>

      <circle cx="300" cy="300" r="230" fill="#F1E7DA" />
      <rect x="512" y="258" width="60" height="104" rx="30" fill="#FAF5EE" />
      <circle cx="300" cy="300" r="170" fill="#FAF5EE" />
      <circle cx="300" cy="300" r="131" fill="#D9A066" />

      <g fill="#FAF5EE" opacity="0.95">
        <ellipse cx="300" cy="302" rx="19" ry="58" />
        <ellipse cx="300" cy="268" rx="61" ry="17" transform="rotate(-26 300 268)" />
        <ellipse cx="300" cy="268" rx="61" ry="17" transform="rotate(26 300 268)" />
        <ellipse cx="300" cy="236" rx="46" ry="13" transform="rotate(-26 300 236)" />
        <ellipse cx="300" cy="236" rx="46" ry="13" transform="rotate(26 300 236)" />
        <ellipse cx="300" cy="212" rx="28" ry="10" transform="rotate(-20 300 212)" />
        <ellipse cx="300" cy="212" rx="28" ry="10" transform="rotate(20 300 212)" />
        <ellipse cx="300" cy="194" rx="11" ry="6" />
      </g>

      <circle cx="300" cy="300" r="131" fill="none" stroke="#3B2418" strokeOpacity="0.06" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-espresso text-cream">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="relative z-10 order-2 lg:order-1">
          <p className="flex items-center gap-3 text-[11px] tracking-[0.14em] text-cream/55">
            <span aria-hidden="true" className="block h-px w-9 bg-copper/70" />
            منوی کافه · پاییز ۱۴۰۵
          </p>

          <h1 className="mt-6 font-display text-[38px] leading-[1.32] sm:text-[52px] lg:text-[68px]">
            قهوه‌ات را انتخاب کن،
            <br />
            ما دم می‌کنیم<span className="text-copper">.</span>
          </h1>

          <p className="mt-6 max-w-lg text-[15px] font-light leading-9 text-cream/65">
            منوی کامل، سفارش آنلاین و تحویل سر میز یا دم در — هر روز از ۷ صبح تا ۱۱ شب.
            دانه‌ها هفتگی رست می‌شوند و فنجان با وزن دقیق دم می‌آید.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full bg-copperDeep px-7 py-3.5 text-[13px] font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-mocha"
            >
              دیدن منو
              <span aria-hidden="true" className="text-[15px] leading-none">
                ←
              </span>
            </a>
            <a
              href="#contact"
              className="border-b border-cream/35 pb-1 text-[13px] font-light text-cream/80 transition-colors duration-200 hover:border-cream hover:text-cream"
            >
              آدرس و ساعت کاری
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-3 border-t border-cream/10 pt-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="border-s border-cream/10 ps-4 first:border-s-0 first:ps-0"
              >
                <dt className="text-[13px] font-medium text-cream">{item.title}</dt>
                <dd className="mt-1.5 text-[10.5px] font-light leading-6 text-cream/60">
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative grid place-items-center lg:absolute lg:inset-y-0 lg:end-[-8%] lg:w-[108%]">
            <LatteArt className="w-[74%] max-w-[380px] animate-cup-drop drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)] sm:max-w-[440px] lg:w-full lg:max-w-none" />

            <div className="absolute bottom-0 start-2 flex items-center gap-3 rounded-2xl bg-cream p-2.5 pe-4 text-espresso shadow-2xl sm:start-6 lg:start-0">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <Image src="/images/latte.jpg" alt="" fill sizes="48px" className="object-cover" />
              </div>
              <div className="leading-tight">
                <strong className="block text-[12.5px] font-medium">کافه لاته</strong>
                <span className="price text-[11.5px] text-muted">{formatPrice(98000)}</span>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute end-2 top-2 hidden h-[92px] w-[92px] rotate-[-8deg] place-content-center rounded-full border border-dashed border-copper/55 bg-cream/[0.06] text-center backdrop-blur-sm sm:grid lg:end-6"
            >
              <span className="text-[9.5px] text-cream/60">از ۱۳۹۴</span>
              <strong className="font-display text-[11px] leading-5 text-amber">
                دم‌آوری
                <br />
                تازه
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
