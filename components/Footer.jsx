import { cafe } from "@/lib/menu";

export default function Footer() {
  return (
    <footer className="bg-espresso py-12 text-cream">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <strong className="font-display text-2xl">{cafe.name}</strong>
            <p className="mt-2 max-w-xs text-[12px] font-light leading-7 text-cream/60">
              منوی آنلاین، سفارش سر میز و بیرون‌بر.
            </p>
          </div>

          <nav className="flex flex-col gap-2.5" aria-label="ناوبری پایین صفحه">
            {[
              { href: "#menu", label: "منو" },
              { href: "#about", label: "درباره ما" },
              { href: "#contact", label: "تماس" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="w-fit text-[12px] font-light text-cream/60 transition-colors duration-200 hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="text-[12px] font-light leading-7 text-cream/60">
            <p>{cafe.address}</p>
            <p className="mt-1">{cafe.hours}</p>
            <p dir="ltr" className="mt-1 text-end sm:text-start">
              {cafe.phone}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-cream/15 pt-6 text-[11px] font-light text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© ۱۴۰۵ {cafe.name} — همه‌ی حقوق محفوظ است.</p>
          <p>هر روز، از هفت صبح.</p>
        </div>
      </div>
    </footer>
  );
}
