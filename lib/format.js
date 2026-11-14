const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toFaDigits(value) {
  return String(value).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);
}

export function toEnDigits(value) {
  return String(value)
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

export function formatNumber(value) {
  const safe = Math.round(Number(value) || 0);
  const grouped = safe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
  return toFaDigits(grouped);
}

export function formatPrice(value) {
  return `${formatNumber(value)} تومان`;
}

export function formatPhone(value) {
  const digits = toEnDigits(value).replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
}
