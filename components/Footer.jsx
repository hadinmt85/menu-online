import { Clock3, MapPin, Phone } from "lucide-react";
import { cafe } from "@/lib/menu";

export default function Footer() {
  return (
    <footer className="relative bg-espresso-dark text-cream/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_260px_at_88%_0%,rgba(196,115,59,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1fr]">
          <div>
            <strong className="font-display text-2xl text-cream">{cafe.name}</strong>
            <p className="mt-2 max-w-xs text-[13px] leading-7">
              {cafe.tagline} — منوی آنلاین و سفارش سریع.
            </p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="ناوبری پایین صفحه">
            <span className="mb-1 text-[11px] font-medium tracking-wider text-copper-light">
              دسترسی سریع
            </span>
            {[
              { href: "#menu", label: "منو" },
              { href: "#about", label: "درباره ما" },
              { href: "#contact", label: "تماس" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="w-fit text-[13px] transition-colors duration-200 hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div>
            <span className="mb-2 block text-[11px] font-medium tracking-wider text-copper-light">
              تماس و ساعت کاری
            </span>
            <ul className="grid gap-2 text-[13px]">
              <li className="flex items-start gap-2">
                <MapPin aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-copper" />
                <span className="leading-6">{cafe.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock3 aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 text-copper" />
                <span className="leading-6">{cafe.hours}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-copper" />
                <span dir="ltr" className="tracking-wide">
                  {cafe.phone}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-cream/10 pt-6 text-[11px] sm:flex-row sm:items-center sm:justify-between">
          <p>© ۱۴۰۵ {cafe.name} — همه‌ی حقوق محفوظ است.</p>
          <p className="text-cream/40">با عشق به قهوه دم می‌کنیم</p>
        </div>
      </div>
    </footer>
  );
}
