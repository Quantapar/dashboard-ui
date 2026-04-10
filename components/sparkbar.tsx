type SparkbarProps = {
  data: number[];
  width?: number;
  height?: number;
};

export function Sparkbar({ data, width = 64, height = 22 }: SparkbarProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const n = data.length;
  const gap = 1.5;
  const barW = (width - gap * (n - 1)) / n;
  const minH = 3;

  return (
    <svg
      className="sparkbar shrink-0"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
    >
      {data.map((v, i) => {
        const normalized = (v - min) / range;
        const h = minH + normalized * (height - minH);
        const x = i * (barW + gap);
        const y = height - h;
        const isLast = i === n - 1;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={h}
            rx={1}
            fill={isLast ? "var(--accent)" : "var(--faint)"}
          />
        );
      })}
    </svg>
  );
}
