import Image from "next/image";
import { AtSign, Clock3, Leaf, MapPin, Phone, Sprout, Timer } from "lucide-react";
import { cafe } from "@/lib/menu";

const values = [
  {
    icon: Sprout,
    title: "دانه‌ی تازه، رست هفتگی",
    text: "دانه‌ها هر هفته در حجم کم رست می‌شوند تا فنجانت همیشه تازه باشد.",
  },
  {
    icon: Leaf,
    title: "شیر و جایگزین گیاهی",
    text: "شیر کامل، کم‌چرب، بادام و جو دوسر؛ انتخاب با توست.",
  },
  {
    icon: Timer,
    title: "سفارش بدون صف",
    text: "از همین صفحه سفارش بده و فقط برای تحویل گرفتن سر وقت بیا.",
  },
];

const contactRows = [
  { icon: MapPin, title: "آدرس", value: cafe.address, dir: "rtl" },
  { icon: Clock3, title: "ساعت کاری", value: cafe.hours, dir: "rtl" },
  { icon: Phone, title: "تلفن", value: cafe.phone, dir: "ltr" },
  { icon: AtSign, title: "اینستاگرام", value: `@${cafe.instagram}`, dir: "ltr" },
];

export default function About() {
  return (
    <>
      <section id="about" className="relative bg-cream py-16 sm:py-20 lg:py-24" aria-labelledby="about-title">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
          <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -bottom-6 -start-6 h-40 w-40 rounded-full bg-olive/10 blur-2xl"
            />
            <div className="relative aspect-[4/4.4] overflow-hidden rounded-[2rem] shadow-card ring-1 ring-espresso/10 [border-end-end-radius:5rem]">
              <Image
                src="/images/croissant.jpg"
                alt="کروسان کره‌ای تازه در سینی"
                fill
                sizes="(max-width: 900px) 92vw, 440px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-espresso/15 bg-sand/70 px-3.5 py-1 text-[11px] font-medium text-olive">
              <Leaf aria-hidden="true" className="h-3.5 w-3.5" />
              درباره ما
            </span>
            <h2
              id="about-title"
              className="mt-3 font-display text-[1.75rem] leading-snug text-espresso sm:text-4xl sm:leading-tight"
            >
              یک کافه‌ی کوچک با وسواس زیاد
            </h2>
            <p className="mt-4 text-[15px] leading-9 text-muted">
              {cafe.name} از سال ۱۳۹۴ در گوشه‌ای دنج در کریم‌خان کار می‌کند. تمرکز ما روی سه چیز است:
              قهوه‌ی درست، فضای آرام و برخورد گرم. منو را هر فصل کوتاه و دقیق نگه می‌داریم؛
              فقط چیزهایی که خودمان با خیال راحت می‌نوشیم و می‌خوریم.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-espresso/10 bg-white/55 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-copper/30 hover:bg-white/80 hover:shadow-soft"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-copper/10 text-copper-dark">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <h3 className="mt-3 text-[13px] font-bold text-espresso">{value.title}</h3>
                    <p className="mt-1 text-xs leading-6 text-muted">{value.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-cream pb-16 sm:pb-20 lg:pb-24" aria-labelledby="contact-title">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-espresso px-6 py-10 text-cream shadow-lift sm:rounded-[2.5rem] sm:px-10 sm:py-12 lg:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(620px_320px_at_92%_-10%,rgba(196,115,59,0.38),transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_300px_at_0%_110%,rgba(74,93,58,0.4),transparent_72%)]"
            />

            <div className="relative grid gap-9 lg:grid-cols-2 lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-3.5 py-1 text-[11px] font-medium text-copper-light">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  پیدا کردن ما
                </span>
                <h2
                  id="contact-title"
                  className="mt-4 font-display text-2xl leading-snug text-cream sm:text-4xl sm:leading-tight"
                >
                  سر بزن، یا سفارشت را از همین‌جا ثبت کن
                </h2>
                <p className="mt-3 max-w-[38ch] text-[13px] leading-8 text-cream/70 sm:text-sm">
                  برای سفارش حضوری فقط شماره میز را می‌خواهیم. بیرون‌بر هم آماده است.
                </p>
              </div>

              <ul className="grid content-center">
                {contactRows.map((row) => {
                  const Icon = row.icon;

                  return (
                    <li
                      key={row.title}
                      className="flex items-start gap-3 border-b border-cream/10 py-3 last:border-b-0"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cream/10 text-copper-light">
                        <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <strong className="block text-[13px] font-bold text-cream">{row.title}</strong>
                        <span dir={row.dir} className="block text-xs leading-6 text-cream/70">
                          {row.value}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
