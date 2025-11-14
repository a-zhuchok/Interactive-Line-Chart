import { DataPoint, Variation, ProcessedDataPoint, TimeRange } from "../types";

export const getVariationKey = (variation: Variation): string => {
  return variation.id?.toString() || "0";
};

export const calculateConversionRate = (conversions: number, visits: number): number => {
  if (visits === 0) return 0;
  return (conversions / visits) * 100;
};

export const processData = (
  data: DataPoint[],
  variations: Variation[],
  selectedVariations: Set<string>,
  timeRange: TimeRange
): ProcessedDataPoint[] => {
  const processed: ProcessedDataPoint[] = [];

  data.forEach((point) => {
    const processedPoint: ProcessedDataPoint = { date: point.date };

    variations.forEach((variation) => {
      const key = getVariationKey(variation);
      if (selectedVariations.has(key)) {
        const visits = point.visits[key] || 0;
        const conversions = point.conversions[key] || 0;
        processedPoint[key] = calculateConversionRate(conversions, visits);
      }
    });

    processed.push(processedPoint);
  });

  if (timeRange === "week") {
    return aggregateByWeek(processed);
  }

  return processed;
};

const aggregateByWeek = (data: ProcessedDataPoint[]): ProcessedDataPoint[] => {
  const weeklyData: ProcessedDataPoint[] = [];
  const weekMap = new Map<string, ProcessedDataPoint[]>();

  data.forEach((point) => {
    const date = new Date(point.date);
    const weekStart = getWeekStart(date);
    const weekKey = weekStart.toISOString().split("T")[0];

    if (!weekMap.has(weekKey)) {
      weekMap.set(weekKey, []);
    }
    weekMap.get(weekKey)!.push(point);
  });

  weekMap.forEach((weekPoints, weekKey) => {
    const aggregated: ProcessedDataPoint = { date: weekKey };

    const variationKeys = Object.keys(weekPoints[0]).filter((key) => key !== "date");

    variationKeys.forEach((key) => {
      const values = weekPoints.map((p) => p[key] as number).filter((v) => !isNaN(v));
      if (values.length > 0) {
        aggregated[key] = values.reduce((sum, val) => sum + val, 0) / values.length;
      }
    });

    weeklyData.push(aggregated);
  });

  return weeklyData.sort((a, b) => a.date.localeCompare(b.date));
};

const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

export const getDataRange = (
  data: ProcessedDataPoint[],
  selectedVariations: Set<string>
): { min: number; max: number } => {
  let min = Infinity;
  let max = -Infinity;

  data.forEach((point) => {
    selectedVariations.forEach((key) => {
      const value = point[key] as number;
      if (typeof value === "number" && !isNaN(value)) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    });
  });

  if (min === Infinity || max === -Infinity) {
    return { min: 0, max: 100 };
  }

  const padding = (max - min) * 0.1;
  return {
    min: Math.max(0, min - padding),
    max: max + padding,
  };
};
