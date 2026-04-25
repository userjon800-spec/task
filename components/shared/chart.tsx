"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
type Language = {
  name: string;
  percentage: number;
};
const COLORS = [
  "#FF6B6B",
  "#FFD93D",
  "#6BCB77",
  "#4D96FF",
  "#FF8FAB",
  "#845EC2",
  "#00C9A7",
  "#FF9671",
  "#2C3E50",
  "#E74C3C",
  "#3498DB",
  "#9B59B6",
  "#1ABC9C",
  "#F39C12",
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
  const t = useTranslations("org");
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgSize, setSvgSize] = useState(280);
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setSvgSize(Math.min(width - 32, 280));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (!data || data.length === 0) return null;
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage);
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const r = svgSize * 0.4;
  let currentAngle = 0;
  const needsScroll = sortedData.length > 6;
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          {t("distribution")}
        </h3>
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          <div className="shrink-0">
            <svg
              width={svgSize}
              height={svgSize}
              className="drop-shadow-lg"
              style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
            >
              {sortedData.map((item, index) => {
                const angle = (item.percentage / 100) * 360;
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                const path = describeArc(cx, cy, r, startAngle, endAngle);
                // eslint-disable-next-line react-hooks/immutability
                currentAngle = endAngle;
                return (
                  <g key={index}>
                    <path
                      d={path}
                      fill={COLORS[index % COLORS.length]}
                      stroke="white"
                      strokeWidth="2"
                      className="transition-all duration-300 cursor-pointer"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
          <div
            className={`flex-1 w-full ${
              needsScroll ? "h-64 overflow-y-auto" : ""
            } pr-2`}
            style={{ maxHeight: "280px" }}
          >
            <div className="space-y-2">
              {sortedData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-12 text-right">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${item.percentage}%`,
                          background: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{t('total')}: {sortedData.length}</span>
          <span>
            {t('analyz')}:{" "}
            {sortedData.reduce((sum, l) => sum + l.percentage, 0).toFixed(0)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}