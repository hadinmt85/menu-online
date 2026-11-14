import { cafe } from "@/lib/menu";
import { formatNumber } from "@/lib/format";

const values = [
  {
    title: "دانه‌ی تازه‌ی هفته",
    text: "هر هفته در حجم کم رست می‌کنیم؛ دانه‌ی مانده به هفته‌ی بعد نمی‌رسد.",
  },
  {
    title: "شیر و جایگزین گیاهی",
    text: "شیر کامل، کم‌چرب، بادام و جو دوسر؛ انتخاب با توست.",
  },
  {
    title: "سفارش بدون صف",
    text: "از همین صفحه سفارش بده و فقط برای تحویل گرفتن سر وقت بیا.",
  },
];

const contactRows = [
  { title: "آدرس", value: cafe.address, dir: "rtl" },
  { title: "ساعت کاری", value: cafe.hours, dir: "rtl" },
  { title: "تلفن", value: cafe.phone, dir: "ltr" },
  { title: "اینستاگرام", value: `@${cafe.instagram}`, dir: "ltr" },
];

export default function About() {
  return (
    <>
      <section id="about" className="bg-plate py-16 sm:py-24" aria-labelledby="about-title">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-8">
          <div>
            <h2
              id="about-title"
              className="font-display text-[30px] leading-[1.5] text-espresso sm:text-[42px]"
            >
              منوی کوتاه،
              <br />
              کارِ درست<span className="text-copper">.</span>
            </h2>
            <p className="mt-6 max-w-md text-[14px] font-light leading-9 text-muted">
              {cafe.name} از ۱۳۹۴ در کریم‌خان کار می‌کند. منو را هر فصل کوتاه نگه می‌داریم؛ فقط
              چیزهایی که خودمان با خیال راحت می‌نوشیم و می‌خوریم.
            </p>
            <p className="mt-5 text-[11px] font-light tracking-wide text-muted">
              کریم‌خان، کوچه‌ی هنر — از ۱۳۹۴
            </p>
          </div>

          <ol className="divide-y divide-espresso/15 border-y border-espresso/15">
            {values.map((value, index) => (
              <li key={value.title} className="flex gap-5 py-6 first:pt-7 last:pb-7">
                <span className="price w-8 shrink-0 text-[13px] text-copper">
                  {formatNumber(index + 1)}
                </span>
                <div>
                  <h3 className="text-[14px] font-medium text-espresso">{value.title}</h3>
                  <p className="mt-1.5 text-[13px] font-light leading-7 text-muted">{value.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden bg-copperDeep py-16 text-cream sm:py-24"
        aria-labelledby="contact-title"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 360 360"
          fill="none"
          stroke="currentColor"
          className="pointer-events-none absolute -start-28 -top-28 h-[360px] w-[360px] text-cream/25"
        >
          <circle cx="180" cy="180" r="176" />
          <circle cx="180" cy="180" r="142" strokeOpacity="0.8" />
          <circle cx="180" cy="180" r="108" strokeOpacity="0.6" />
        </svg>

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
          <div>
            <h2
              id="contact-title"
              className="font-display text-[30px] leading-[1.5] text-cream sm:text-[44px]"
            >
              سر بزن، یا سفارش را از همین‌جا ثبت کن
              <span className="text-espresso">.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[13px] font-light leading-8 text-cream/80">
              برای سفارش حضوری فقط شماره میز را می‌خواهیم؛ بیرون‌بر هم آماده است.
            </p>
          </div>

          <ul className="self-center divide-y divide-cream/25 border-y border-cream/25">
            {contactRows.map((row) => (
              <li key={row.title} className="flex items-baseline justify-between gap-6 py-3.5">
                <strong className="shrink-0 text-[12px] font-light text-cream/70">{row.title}</strong>
                <span dir={row.dir} className="text-end text-[13px] leading-7 text-cream">
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
