import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { getItem, TAX_RATE } from "@/lib/menu";

const ORDERS_DIR = path.join(process.cwd(), ".data");
const ORDERS_FILE = path.join(ORDERS_DIR, "orders.json");
const MAX_LINES = 30;
const MAX_QTY = 20;

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeCode() {
  let code = "";
  for (let i = 0; i < 4; i += 1) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `NT-${code}`;
}

async function readOrders() {
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "درخواست نامعتبر است." }, { status: 400 });
  }

  const rawItems = Array.isArray(payload?.items) ? payload.items : [];
  if (rawItems.length === 0) {
    return NextResponse.json({ ok: false, message: "سبد سفارش خالی است." }, { status: 400 });
  }
  if (rawItems.length > MAX_LINES) {
    return NextResponse.json({ ok: false, message: "تعداد اقلام سفارش بیش از حد مجاز است." }, { status: 400 });
  }

  const lines = [];
  for (const raw of rawItems) {
    const item = getItem(raw?.id);
    const qty = Math.round(Number(raw?.qty));
    if (!item || !Number.isFinite(qty) || qty < 1) {
      return NextResponse.json({ ok: false, message: "یکی از اقلام سفارش معتبر نیست." }, { status: 400 });
    }
    lines.push({ id: item.id, name: item.name, price: item.price, qty: Math.min(MAX_QTY, qty) });
  }

  const name = String(payload?.customer?.name ?? "").trim();
  const phone = String(payload?.customer?.phone ?? "").replace(/\D/g, "");
  const type = payload?.type === "takeaway" ? "takeaway" : "dine-in";
  const table = String(payload?.table ?? "").trim().slice(0, 8);
  const note = String(payload?.note ?? "").trim().slice(0, 300);

  if (name.length < 2 || name.length > 60) {
    return NextResponse.json({ ok: false, message: "نام را کامل وارد کن." }, { status: 400 });
  }
  if (!/^09\d{9}$/.test(phone)) {
    return NextResponse.json({ ok: false, message: "شماره موبایل معتبر نیست." }, { status: 400 });
  }
  if (type === "dine-in" && table === "") {
    return NextResponse.json({ ok: false, message: "شماره میز را وارد کن." }, { status: 400 });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;
  const pieceCount = lines.reduce((sum, line) => sum + line.qty, 0);

  const orders = await readOrders();
  let code = makeCode();
  while (orders.some((order) => order.code === code)) {
    code = makeCode();
  }

  const order = {
    code,
    items: lines,
    subtotal,
    tax,
    total,
    type,
    table,
    note,
    customer: { name, phone },
    estimatedMinutes: 8 + Math.min(pieceCount, 12) * 2,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  try {
    await fs.mkdir(ORDERS_DIR, { recursive: true });
    orders.push(order);
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
  } catch {
    return NextResponse.json(
      { ok: false, message: "ذخیره‌ی سفارش با خطا مواجه شد. لطفاً دوباره تلاش کن." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    order: {
      code: order.code,
      subtotal: order.subtotal,
      tax: order.tax,
      total: order.total,
      type: order.type,
      table: order.table,
      estimatedMinutes: order.estimatedMinutes,
      createdAt: order.createdAt,
    },
  });
}
