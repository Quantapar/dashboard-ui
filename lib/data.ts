export type StatKey =
  | "revenue"
  | "netProfit"
  | "orders"
  | "confirmRate"
  | "returnRate"
  | "deliveryRate";

export type Stat = {
  key: StatKey;
  value: string;
  change: number;
  /** 7-bucket trend (oldest → newest). Last value = most recent bucket. */
  trend: number[];
};

export const periods = [
  "last7Days",
  "last30Days",
  "last90Days",
  "last12Months",
] as const;

export type Period = (typeof periods)[number];

/** Every sparkbar shows 7 bars regardless of period.
   Each bar represents a chunk of time within the period:
     - 7 Days   → 1 day per bar
     - 30 Days  → ~4 days per bar
     - 90 Days  → ~13 days per bar (~2 weeks)
     - 12 Months → ~52 days per bar (~7 weeks)
   For additive metrics (Revenue, Profit, Orders), the 7 bucket values
   approximately sum to the headline total. */
const trendBucketCount: Record<Period, number> = {
  last7Days: 7,
  last30Days: 7,
  last90Days: 7,
  last12Months: 7,
};

/** Linear monotonic trend from start → end across N buckets. */
function makeTrend(start: number, end: number, count: number): number[] {
  if (count <= 1) return [end];
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    out.push(start + (end - start) * (i / (count - 1)));
  }
  return out;
}

const t = trendBucketCount;

export const statsByPeriod: Record<Period, Stat[]> = {
  last7Days: [
    { key: "revenue", value: "$11,250", change: 8.7, trend: makeTrend(1100, 1850, t.last7Days) },
    { key: "netProfit", value: "$4,180", change: 6.2, trend: makeTrend(460, 720, t.last7Days) },
    { key: "orders", value: "312", change: 3.1, trend: makeTrend(38, 49, t.last7Days) },
    { key: "confirmRate", value: "95.1%", change: 0.8, trend: makeTrend(94.0, 95.1, t.last7Days) },
    { key: "returnRate", value: "2.4%", change: -0.4, trend: makeTrend(2.9, 2.4, t.last7Days) },
    { key: "deliveryRate", value: "97.2%", change: 0.5, trend: makeTrend(96.5, 97.2, t.last7Days) },
  ],
  last30Days: [
    // Additive: 7 × 4-day buckets sum ≈ headline
    { key: "revenue", value: "$48,329", change: 12.4, trend: makeTrend(5500, 8500, t.last30Days) },
    { key: "netProfit", value: "$18,204", change: 8.2, trend: makeTrend(2200, 3000, t.last30Days) },
    { key: "orders", value: "1,284", change: 4.7, trend: makeTrend(155, 215, t.last30Days) },
    // Rates: bucket value = rate during that bucket
    { key: "confirmRate", value: "94.2%", change: 1.3, trend: makeTrend(92.5, 94.2, t.last30Days) },
    { key: "returnRate", value: "2.8%", change: -0.6, trend: makeTrend(3.4, 2.8, t.last30Days) },
    { key: "deliveryRate", value: "96.7%", change: 0.9, trend: makeTrend(95.5, 96.7, t.last30Days) },
  ],
  last90Days: [
    // Additive: 7 × ~13-day buckets sum ≈ headline
    { key: "revenue", value: "$142,180", change: 18.3, trend: makeTrend(17000, 24000, t.last90Days) },
    { key: "netProfit", value: "$51,840", change: 14.1, trend: makeTrend(6300, 8500, t.last90Days) },
    { key: "orders", value: "3,892", change: 9.8, trend: makeTrend(470, 645, t.last90Days) },
    { key: "confirmRate", value: "93.6%", change: -0.4, trend: makeTrend(94.0, 93.6, t.last90Days) },
    { key: "returnRate", value: "3.1%", change: 0.3, trend: makeTrend(2.8, 3.1, t.last90Days) },
    { key: "deliveryRate", value: "96.2%", change: -0.4, trend: makeTrend(96.6, 96.2, t.last90Days) },
  ],
  last12Months: [
    // Additive: 7 × ~52-day buckets sum ≈ headline
    { key: "revenue", value: "$584,920", change: 24.7, trend: makeTrend(70000, 98000, t.last12Months) },
    { key: "netProfit", value: "$213,650", change: 19.2, trend: makeTrend(26000, 35000, t.last12Months) },
    { key: "orders", value: "15,724", change: 16.4, trend: makeTrend(1900, 2600, t.last12Months) },
    { key: "confirmRate", value: "93.1%", change: 1.8, trend: makeTrend(91.4, 93.1, t.last12Months) },
    { key: "returnRate", value: "3.4%", change: 0.2, trend: makeTrend(3.2, 3.4, t.last12Months) },
    { key: "deliveryRate", value: "95.8%", change: -0.6, trend: makeTrend(96.4, 95.8, t.last12Months) },
  ],
};

export type OrderStatus = "New" | "Processing" | "Shipped" | "Done" | "Return";

export type Order = {
  id: string;
  customer: string;
  amount: string;
  status: OrderStatus;
};

export const orders: Order[] = [
  { id: "ORD-8842", customer: "Amelia Hart", amount: "$1,240.00", status: "New" },
  { id: "ORD-8841", customer: "Noah Patel", amount: "$326.50", status: "Processing" },
  { id: "ORD-8840", customer: "Léa Moreau", amount: "$2,815.00", status: "Shipped" },
  { id: "ORD-8839", customer: "Daichi Sato", amount: "$94.20", status: "Done" },
  { id: "ORD-8838", customer: "Olivia Bennett", amount: "$612.75", status: "Return" },
  { id: "ORD-8837", customer: "Mateo Rivera", amount: "$1,489.00", status: "Shipped" },
  { id: "ORD-8836", customer: "Hana Kobayashi", amount: "$248.30", status: "Done" },
  { id: "ORD-8835", customer: "Eitan Levi", amount: "$3,102.00", status: "Processing" },
  { id: "ORD-8834", customer: "Sofia Marchetti", amount: "$78.90", status: "New" },
  { id: "ORD-8833", customer: "Kwame Asante", amount: "$1,856.40", status: "Done" },
  { id: "ORD-8832", customer: "Yuki Tanaka", amount: "$542.00", status: "Shipped" },
  { id: "ORD-8831", customer: "Aiden Okonkwo", amount: "$1,925.50", status: "Processing" },
  { id: "ORD-8830", customer: "Isabella Conti", amount: "$348.20", status: "Done" },
  { id: "ORD-8829", customer: "Rohan Sharma", amount: "$2,468.00", status: "New" },
  { id: "ORD-8828", customer: "Mia Lindqvist", amount: "$176.45", status: "Shipped" },
  { id: "ORD-8827", customer: "Liam O'Connor", amount: "$3,840.00", status: "Done" },
  { id: "ORD-8826", customer: "Zara Ahmed", amount: "$528.75", status: "Processing" },
  { id: "ORD-8825", customer: "Akira Nakamura", amount: "$1,094.30", status: "Shipped" },
  { id: "ORD-8824", customer: "Carlos Mendez", amount: "$216.80", status: "New" },
  { id: "ORD-8823", customer: "Priya Iyer", amount: "$2,150.00", status: "Done" },
  { id: "ORD-8822", customer: "Felix Schmidt", amount: "$687.40", status: "Processing" },
  { id: "ORD-8821", customer: "Aria Hosseini", amount: "$1,432.90", status: "Shipped" },
  { id: "ORD-8820", customer: "Diego Rodriguez", amount: "$385.20", status: "Return" },
  { id: "ORD-8819", customer: "Linnea Bergström", amount: "$928.50", status: "Done" },
  { id: "ORD-8818", customer: "Tomás Silva", amount: "$1,675.00", status: "Processing" },
  { id: "ORD-8817", customer: "Yara El-Amin", amount: "$254.60", status: "New" },
  { id: "ORD-8816", customer: "Sebastian Klein", amount: "$2,945.80", status: "Shipped" },
  { id: "ORD-8815", customer: "Anya Petrova", amount: "$418.00", status: "Done" },
  { id: "ORD-8814", customer: "Hiroshi Yamamoto", amount: "$1,287.40", status: "Processing" },
  { id: "ORD-8813", customer: "Camila Rojas", amount: "$762.30", status: "Shipped" },
  { id: "ORD-8812", customer: "Aleksander Nowak", amount: "$3,520.00", status: "Done" },
  { id: "ORD-8811", customer: "Sienna Chen", amount: "$192.85", status: "New" },
  { id: "ORD-8810", customer: "Mateusz Kowalski", amount: "$1,068.20", status: "Processing" },
  { id: "ORD-8809", customer: "Aisha Bello", amount: "$2,340.50", status: "Shipped" },
  { id: "ORD-8808", customer: "Lucas Dubois", amount: "$496.70", status: "Done" },
  { id: "ORD-8807", customer: "Eleni Papadopoulos", amount: "$1,824.00", status: "New" },
  { id: "ORD-8806", customer: "Ravi Krishnan", amount: "$348.90", status: "Return" },
  { id: "ORD-8805", customer: "Astrid Hansen", amount: "$2,176.30", status: "Done" },
  { id: "ORD-8804", customer: "Idris Diallo", amount: "$685.00", status: "Processing" },
  { id: "ORD-8803", customer: "Mei Lin Wong", amount: "$1,392.45", status: "Shipped" },
  { id: "ORD-8802", customer: "Théo Lefèvre", amount: "$248.60", status: "New" },
  { id: "ORD-8801", customer: "Nadia Saidi", amount: "$3,015.80", status: "Done" },
  { id: "ORD-8800", customer: "Oscar Lindgren", amount: "$542.20", status: "Processing" },
  { id: "ORD-8799", customer: "Saoirse Walsh", amount: "$1,728.00", status: "Shipped" },
  { id: "ORD-8798", customer: "Jamal Hassan", amount: "$416.50", status: "Done" },
  { id: "ORD-8797", customer: "Valentina Russo", amount: "$2,489.30", status: "New" },
  { id: "ORD-8796", customer: "Kenji Watanabe", amount: "$372.80", status: "Shipped" },
  { id: "ORD-8795", customer: "Freya Andersson", amount: "$1,154.60", status: "Processing" },
  { id: "ORD-8794", customer: "Adebayo Okafor", amount: "$2,830.00", status: "Done" },
  { id: "ORD-8793", customer: "Ines Gomes", amount: "$198.40", status: "Shipped" },
];
