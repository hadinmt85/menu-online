import { cafe } from "@/lib/menu";

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
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="relative z-10 order-2 lg:order-1">
          <h1 className="font-display text-[32px] leading-[1.5] sm:text-[42px] lg:text-[58px]">
            قهوه‌ات را انتخاب کن،
            <br />
            ما دم می‌کنیم<span className="text-copper">.</span>
          </h1>

          <p className="mt-6 max-w-md text-[15px] font-light leading-9 text-cream/70 sm:text-base">
            منوی کامل، سفارش آنلاین و تحویل سر میز یا دم در — هر روز از ۷ صبح تا ۱۱ شب.
          </p>

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="#menu"
              className="rounded-full bg-copper px-8 py-3.5 text-sm font-medium text-cream transition-colors duration-200 hover:bg-mocha"
            >
              دیدن منو
            </a>
            <a
              href="#contact"
              className="border-b border-cream/40 pb-1 text-sm font-light text-cream/85 transition-colors duration-200 hover:border-cream hover:text-cream"
            >
              آدرس و ساعت کاری
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-cream/15 pt-6">
            {highlights.map((item) => (
              <div key={item.title}>
                <dt className="text-[13px] font-medium text-cream sm:text-sm">{item.title}</dt>
                <dd className="mt-1 text-[11px] font-light leading-6 text-cream/60 sm:text-xs">
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="lg:pointer-events-none lg:absolute lg:inset-y-0 lg:end-[-22%] lg:flex lg:w-[80%] lg:items-center">
            <LatteArt className="mx-auto w-[74%] max-w-[380px] animate-cup-drop sm:max-w-[440px] lg:w-full lg:max-w-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
