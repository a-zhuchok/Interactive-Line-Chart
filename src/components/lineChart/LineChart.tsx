import React, { useMemo, useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
  Brush,
} from "recharts";
import { DataPoint, Variation, LineStyle, TimeRange } from "../../types";
import { processData, getVariationKey, getDataRange } from "../../utils/dataProcessing";
import styles from "./LineChart.module.css";

interface LineChartProps {
  data: DataPoint[];
  variations: Variation[];
  selectedVariations: Set<string>;
  timeRange: TimeRange;
  lineStyle: LineStyle;
  isDarkTheme: boolean;
  zoomEnabled: boolean;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const LineChart: React.FC<LineChartProps> = ({
  data,
  variations,
  selectedVariations,
  timeRange,
  lineStyle,
  isDarkTheme,
  zoomEnabled,
}) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  const processedData = useMemo(
    () => processData(data, variations, selectedVariations, timeRange),
    [data, variations, selectedVariations, timeRange]
  );

  const dataRange = useMemo(
    () => getDataRange(processedData, selectedVariations),
    [processedData, selectedVariations]
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return timeRange === "week"
      ? `Week of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
      : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className={`${styles.tooltip} ${isDarkTheme ? styles.dark : ""}`}>
        <p className={styles.tooltipLabel}>{formatDate(label)}</p>
        {payload.map((entry: any, index: number) => {
          const variation = variations.find((v) => getVariationKey(v) === entry.dataKey);
          return (
            <p key={index} style={{ color: entry.color }}>
              {variation?.name}: {entry.value.toFixed(2)}%
            </p>
          );
        })}
      </div>
    );
  };

  const CustomCursor = ({ points, active }: any) => {
    if (!active || !points || points.length === 0) return null;
    return (
      <line
        x1={points[0].x}
        y1={points[0].y}
        x2={points[0].x}
        y2={points[points.length - 1].y}
        stroke={isDarkTheme ? "#666" : "#999"}
        strokeWidth={1}
        strokeDasharray="5 5"
      />
    );
  };

  const renderChartContent = () => {
    const selectedVariationsArray = Array.from(selectedVariations);
    const ChartComponent = lineStyle === "area" ? AreaChart : RechartsLineChart;

    return (
      <ChartComponent
        data={processedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        onMouseMove={(state: any) => {
          if (state?.activeLabel) {
            setHoveredDate(state.activeLabel);
          }
        }}
        onMouseLeave={() => setHoveredDate(null)}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? "#444" : "#e5e7eb"} />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          stroke={isDarkTheme ? "#ccc" : "#666"}
          style={{ fontSize: "12px" }}
        />
        <YAxis
          domain={[dataRange.min, dataRange.max]}
          tickFormatter={(value) => `${value.toFixed(1)}%`}
          stroke={isDarkTheme ? "#ccc" : "#666"}
          style={{ fontSize: "12px" }}
        />
        <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
        {hoveredDate && (
          <ReferenceLine
            x={hoveredDate}
            stroke={isDarkTheme ? "#666" : "#999"}
            strokeDasharray="5 5"
          />
        )}
        {selectedVariationsArray.map((key, index) => {
          const variation = variations.find((v) => getVariationKey(v) === key);
          if (!variation) return null;

          const color = COLORS[index % COLORS.length];
          const curveType = lineStyle === "smooth" ? "monotone" : "linear";

          if (lineStyle === "area") {
            return (
              <Area
                key={key}
                type={curveType}
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                fill={color}
                fillOpacity={0.2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name={variation.name}
              />
            );
          }

          return (
            <Line
              key={key}
              type={curveType}
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name={variation.name}
            />
          );
        })}
        {zoomEnabled && (
          <Brush
            dataKey="date"
            height={30}
            stroke={isDarkTheme ? "#666" : "#999"}
            tickFormatter={formatDate}
          />
        )}
      </ChartComponent>
    );
  };

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={400}>
        {renderChartContent()}
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
