import React from "react";

/**
 * تصویرهای تختِ «از بالا» برای نوشیدنی‌ها و شیرینی‌ها.
 * فقط برای ظاهر است و هیچ منطقی ندارد.
 */

const PLATE = "#F1E7DA";
const CREAM = "#FAF5EE";
const LINE = "#3B2418";

function Rosetta({ cx = 60, cy = 60 }) {
  return (
    <g fill={CREAM} opacity="0.92">
      <ellipse cx={cx} cy={cy - 2} rx="7" ry="16" />
      <ellipse cx={cx} cy={cy - 14} rx="22" ry="7" transform={`rotate(-22 ${cx} ${cy - 14})`} />
      <ellipse cx={cx} cy={cy - 14} rx="22" ry="7" transform={`rotate(22 ${cx} ${cy - 14})`} />
      <ellipse cx={cx} cy={cy - 26} rx="15" ry="5.5" transform={`rotate(-22 ${cx} ${cy - 26})`} />
      <ellipse cx={cx} cy={cy - 26} rx="15" ry="5.5" transform={`rotate(22 ${cx} ${cy - 26})`} />
      <ellipse cx={cx} cy={cy - 35} rx="7" ry="4" />
    </g>
  );
}

function Leaf({ cx = 60, cy = 58 }) {
  return (
    <g fill={CREAM} opacity="0.9">
      <path
        d={`M${cx} ${cy + 12} C${cx} ${cy - 2} ${cx + 4} ${cy - 12} ${cx} ${cy - 20} C${cx - 4} ${cy - 12} ${cx} ${cy - 2} ${cx} ${cy + 12} Z`}
      />
      <ellipse cx={cx - 11} cy={cy - 10} rx="8" ry="4" transform={`rotate(-24 ${cx - 11} ${cy - 10})`} />
      <ellipse cx={cx + 11} cy={cy - 10} rx="8" ry="4" transform={`rotate(24 ${cx + 11} ${cy - 10})`} />
      <ellipse cx={cx - 10} cy={cy + 1} rx="6" ry="3" transform={`rotate(-24 ${cx - 10} ${cy + 1})`} />
      <ellipse cx={cx + 10} cy={cy + 1} rx="6" ry="3" transform={`rotate(24 ${cx + 10} ${cy + 1})`} />
    </g>
  );
}

function HotCup({ color, art }) {
  return (
    <g>
      <rect x="97" y="46" width="15" height="28" rx="7.5" fill={CREAM} />
      <circle cx="60" cy="60" r="50" fill={PLATE} />
      <circle cx="60" cy="60" r="37" fill={CREAM} stroke={LINE} strokeOpacity="0.08" />
      <circle cx="60" cy="60" r="28" fill={color} />
      {art === "rosetta" && <Rosetta />}
      {art === "leaf" && <Leaf />}
      {art === "crema" && (
        <circle cx="60" cy="60" r="28" fill="none" stroke={CREAM} strokeOpacity="0.35" strokeWidth="3" />
      )}
    </g>
  );
}

function IcedGlass({ color, art }) {
  return (
    <g>
      <circle cx="60" cy="60" r="50" fill={PLATE} opacity="0.6" />
      <rect x="64" y="6" width="7" height="64" rx="3.5" fill="#C4733B" transform="rotate(22 67 38)" />
      <circle cx="60" cy="60" r="37" fill={color} stroke={LINE} strokeOpacity="0.12" strokeWidth="2" />
      <g fill={CREAM} opacity="0.55">
        <rect x="40" y="42" width="18" height="18" rx="4" transform="rotate(-14 49 51)" />
        <rect x="64" y="56" width="17" height="17" rx="4" transform="rotate(18 72 64)" />
        <rect x="45" y="68" width="15" height="15" rx="4" transform="rotate(8 52 75)" />
      </g>
      {art === "leaf" && <Leaf cx="60" cy="58" />}
      {art === "boba" && (
        <g fill={LINE} opacity="0.45">
          <circle cx="48" cy="72" r="3.4" />
          <circle cx="60" cy="76" r="3.4" />
          <circle cx="72" cy="70" r="3.4" />
          <circle cx="55" cy="66" r="3.4" />
          <circle cx="67" cy="62" r="3.4" />
        </g>
      )}
      {art === "straw" && null}
    </g>
  );
}

function LemonWedge() {
  return (
    <g>
      <circle cx="82" cy="44" r="15" fill="#E3B58A" stroke="#D9A066" strokeWidth="2" />
      <circle cx="82" cy="44" r="10" fill="#D9A066" opacity="0.75" />
      <g stroke={CREAM} strokeWidth="1.6" opacity="0.9">
        <line x1="82" y1="34" x2="82" y2="54" />
        <line x1="72" y1="44" x2="92" y2="44" />
      </g>
    </g>
  );
}

function TeaCup({ color, art }) {
  return (
    <g>
      <rect x="97" y="46" width="15" height="28" rx="7.5" fill={CREAM} />
      <circle cx="60" cy="60" r="50" fill={PLATE} />
      <circle cx="60" cy="60" r="37" fill={CREAM} stroke={LINE} strokeOpacity="0.08" />
      <circle cx="60" cy="60" r="28" fill={color} />
      {art === "leaf" && <Leaf />}
      {art === "lemon" && <LemonWedge />}
    </g>
  );
}

function Pastry({ color, food }) {
  return (
    <g>
      <circle cx="60" cy="60" r="50" fill={PLATE} />
      <circle cx="60" cy="60" r="40" fill="none" stroke={LINE} strokeOpacity="0.06" />

      {food === "square" && (
        <g>
          <rect x="36" y="38" width="48" height="46" rx="8" fill={color} />
          <rect x="36" y="38" width="48" height="13" rx="6" fill={CREAM} opacity="0.75" />
        </g>
      )}

      {food === "circle" && (
        <g>
          <circle cx="60" cy="61" r="25" fill={color} />
          <circle cx="60" cy="61" r="17" fill={CREAM} opacity="0.35" />
          <circle cx="54" cy="55" r="2.6" fill={LINE} opacity="0.35" />
          <circle cx="67" cy="66" r="2.2" fill={LINE} opacity="0.3" />
          <circle cx="63" cy="53" r="1.8" fill={LINE} opacity="0.25" />
        </g>
      )}

      {food === "crescent" && (
        <path
          d="M36 78c-2-16 10-30 26-31 9-.6 16 2 20 7-6-1-13 1-18 5-8 7-9 14-6 21-8 3-17 1-22-2Z"
          fill={color}
        />
      )}

      {food === "tart" && (
        <g>
          <circle cx="60" cy="61" r="27" fill="#D9A066" />
          <circle cx="60" cy="61" r="21" fill={color} />
          <g stroke={CREAM} strokeWidth="1.8" opacity="0.7">
            <line x1="60" y1="42" x2="60" y2="80" />
            <line x1="41" y1="61" x2="79" y2="61" />
            <line x1="46" y1="47" x2="74" y2="75" />
            <line x1="74" y1="47" x2="46" y2="75" />
          </g>
        </g>
      )}

      {food === "macaron" && (
        <g>
          <ellipse cx="50" cy="64" rx="17" ry="15" fill={color} />
          <ellipse cx="72" cy="56" rx="15" ry="13" fill="#D9A066" />
          <ellipse cx="50" cy="64" rx="11" ry="5" fill={CREAM} opacity="0.65" />
          <ellipse cx="72" cy="56" rx="9" ry="4" fill={CREAM} opacity="0.6" />
        </g>
      )}
    </g>
  );
}

const artByItem = {
  espresso: { kind: "hot", color: "#5A3222", art: "crema" },
  americano: { kind: "hot", color: "#6B3A24" },
  latte: { kind: "hot", color: "#D9A066", art: "rosetta" },
  cappuccino: { kind: "hot", color: "#C98D55", art: "rosetta" },
  flatwhite: { kind: "hot", color: "#D9A066", art: "leaf" },
  cortado: { kind: "hot", color: "#B07A46" },
  macchiato: { kind: "hot", color: "#A8672F", art: "crema" },
  mocha: { kind: "hot", color: "#7A4528", art: "rosetta" },
  hotchocolate: { kind: "hot", color: "#6B3B22" },
  cafeaulait: { kind: "hot", color: "#C79B72", art: "leaf" },

  coldbrew: { kind: "iced", color: "#4A2A1A" },
  icedlatte: { kind: "iced", color: "#D9A066" },
  frappe: { kind: "iced", color: "#D2A06B" },
  icedamericano: { kind: "iced", color: "#5A3222" },
  milkshake: { kind: "iced", color: "#E3B58A" },
  boba: { kind: "iced", color: "#C99A6E", art: "boba" },
  lemonade: { kind: "iced", color: "#E3B58A" },
  icedtea: { kind: "iced", color: "#8A4A22" },
  orangejuice: { kind: "iced", color: "#D9A066" },

  blacktea: { kind: "tea", color: "#8A4A22" },
  herbaltea: { kind: "tea", color: "#D9A066", art: "lemon" },
  chamomile: { kind: "tea", color: "#E3B58A" },
  greentea: { kind: "tea", color: "#8A9A62", art: "leaf" },
  matcha: { kind: "tea", color: "#6B7F4E", art: "leaf" },
  icematcha: { kind: "iced", color: "#6B7F4E", art: "leaf" },

  cheesecake: { kind: "pastry", color: "#E3B58A", food: "square" },
  brownie: { kind: "pastry", color: "#6B3A24", food: "square" },
  lemontart: { kind: "pastry", color: "#E3B58A", food: "tart" },
  sponge: { kind: "pastry", color: "#D9A066", food: "square" },
  croissant: { kind: "pastry", color: "#D9A066", food: "crescent" },
  cookie: { kind: "pastry", color: "#B07A46", food: "circle" },
  macaron: { kind: "pastry", color: "#E3B58A", food: "macaron" },
};

const fallbackByCategory = {
  hot: { kind: "hot", color: "#C98D55" },
  cold: { kind: "iced", color: "#D9A066" },
  tea: { kind: "tea", color: "#8A9A62" },
  pastry: { kind: "pastry", color: "#D9A066", food: "circle" },
};

export function artFor(item) {
  return artByItem[item?.id] ?? fallbackByCategory[item?.category] ?? fallbackByCategory.hot;
}

export default function CupArt({ item, className = "h-full w-full", label }) {
  const config = artFor(item);
  const { kind, color, art, food } = config;

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    >
      {kind === "hot" && <HotCup color={color} art={art} />}
      {kind === "iced" && <IcedGlass color={color} art={art} />}
      {kind === "tea" && <TeaCup color={color} art={art} />}
      {kind === "pastry" && <Pastry color={color} food={food} />}
    </svg>
  );
}
