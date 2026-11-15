import Image from "next/image";
import Link from "next/link";
import { categories, menuItems } from "@/lib/menu";
import { formatNumber, formatPrice } from "@/lib/format";

export const metadata = {
  title: "نمونه‌ی چیدمان منو | کافه‌یار",
  description: "یک نمونه‌ی جایگزین برای چیدمان منوی کافه‌یار: ردیف‌های عریض با عکس‌های بزرگ.",
};

export default function MockupPage() {
  return (
    <main>
      <section className="bg-espresso pb-12 pt-24 text-cream sm:pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-light tracking-wide text-amber">نمونه‌ی چیدمان</p>
          <h1 className="mt-3 font-display text-[32px] leading-[1.5] sm:text-[46px]">
            منوی تحریریه<span className="text-copper">.</span>
          </h1>
          <p className="mt-4 max-w-md text-[13px] font-light leading-8 text-cream/70">
            چیدمان جایگزین منو با عکس‌های بزرگ افقی و قیمت‌های خط‌چین‌دار؛ برای مقایسه با چیدمان
            فعلی صفحه‌ی اصلی.
          </p>
          <Link
            href="/"
            className="mt-7 inline-block border-b border-cream/40 pb-1 text-[13px] font-light text-cream transition-colors duration-200 hover:border-cream"
          >
            بازگشت به منوی اصلی
          </Link>
        </div>
      </section>

      {categories.map((category, categoryIndex) => {
        const items = menuItems.filter((item) => item.category === category.id);

        return (
          <section
            key={category.id}
            className={categoryIndex % 2 === 0 ? "bg-cream" : "bg-plate"}
          >
            <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
              <div className="flex items-baseline justify-between gap-6 border-b border-espresso/15 pb-4">
                <h2 className="font-display text-[26px] leading-tight text-espresso sm:text-[34px]">
                  {category.label}
                </h2>
                <span className="price shrink-0 text-[12px] text-muted">
                  {formatNumber(items.length)} مورد
                </span>
              </div>

              <div className="mt-10 grid gap-14 sm:mt-14 sm:gap-20">
                {items.map((item, index) => (
                  <article
                    key={item.id}
                    className="grid items-center gap-5 sm:grid-cols-2 sm:gap-12"
                  >
                    <div
                      className={`relative aspect-[16/11] overflow-hidden rounded-2xl border border-espresso/10 sm:rounded-3xl ${
                        index % 2 === 1 ? "sm:order-2" : ""
                      }`}
                    >
                      <Image
                        src={`/images/${item.image}.jpg`}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 92vw, 520px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-2xl leading-tight text-espresso sm:text-3xl">
                          {item.name}
                        </h3>
                        <span className="mb-1 min-w-6 flex-1 border-b border-dotted border-espresso/35" />
                        <span className="price whitespace-nowrap text-lg text-espresso sm:text-xl">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <p className="mt-3 max-w-md text-[13px] font-light leading-8 text-muted">
                        {item.desc}
                      </p>

                      {item.tags.length > 0 && (
                        <p className="mt-3 text-[11px] font-light tracking-wide text-mocha">
                          {item.tags.join(" · ")}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-cream pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-espresso/15 pt-8 text-center">
            <Link
              href="/"
              className="inline-block rounded-full bg-copperDeep px-7 py-3 text-[13px] font-light text-cream transition-colors duration-200 hover:bg-mocha"
            >
              برگشت به منوی اصلی
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
