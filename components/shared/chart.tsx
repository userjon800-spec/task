"use client";
type Language = {
  name: string;
  percentage: number;
};
const COLORS = [
  "#FF6B6B", // qizil (soft)
  "#FFD93D", // sariq
  "#6BCB77", // yashil
  "#4D96FF", // ko‘k
  "#FF8FAB", // pushti
  "#845EC2", // binafsha
  "#00C9A7", // teal
  "#FF9671", // orange
];
function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}
function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `
    M ${cx} ${cy}
    L ${start.x} ${start.y}
    A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
    Z
  `;
}
export default function PieChart({ data }: { data: Language[] }) {
  const cx = 150;
  const cy = 150;
  const r = 120;
  let currentAngle = 0;
  return (
    <div className="flex gap-8 items-center">
      <svg width={300} height={300}>
        {data.map((item, index) => {
          const angle = (item.percentage / 100) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          const path = describeArc(cx, cy, r, startAngle, endAngle);
          // eslint-disable-next-line react-hooks/immutability
          currentAngle = endAngle;
          return (
            <path key={index} d={path} fill={COLORS[index % COLORS.length]} />
          );
        })}
      </svg>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4"
              style={{ background: COLORS[index % COLORS.length] }}
            />
            <span>
              {item.name}: {item.percentage.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
