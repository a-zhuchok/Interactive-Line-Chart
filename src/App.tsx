import React, { useState } from "react";
import { ChartData, Variation, TimeRange, LineStyle } from "./types";
import LineChart from "./components/lineChart/LineChart";
import VariationsSelector from "./components/variationsSelector/VariationsSelector";
import DayWeekSelector from "./components/dayWeekSelector/DayWeekSelector";
import LineStyleSelector from "./components/lineStyleSelector/LineStyleSelector";
import ThemeToggle from "./components/themeToggle/ThemeToggle";
import ZoomControls from "./components/zoomControls/ZoomControls";
import ExportButton from "./components/exportButton/ExportButton";
import chartDataJson from "../data.json";
import styles from "./App.module.css";

const chartData = chartDataJson as ChartData;

const App: React.FC = () => {
  const [selectedVariations, setSelectedVariations] = useState<Set<string>>(new Set(["0"]));
  const [timeRange, setTimeRange] = useState<TimeRange>("day");
  const [lineStyle, setLineStyle] = useState<LineStyle>("line");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);

  const variations: Variation[] = chartData.variations;

  const handleVariationToggle = (variationKey: string) => {
    setSelectedVariations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(variationKey)) {
        if (newSet.size > 1) {
          newSet.delete(variationKey);
        }
      } else {
        newSet.add(variationKey);
      }
      return newSet;
    });
  };

  return (
    <div className={`${styles.app} ${isDarkTheme ? styles.dark : ""}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>A/B Test Statistics</h1>
          <div className={styles.controls}>
            <ThemeToggle isDark={isDarkTheme} onToggle={setIsDarkTheme} />
            <ExportButton />
          </div>
        </header>

        <div className={styles.controlsRow}>
          <VariationsSelector
            variations={variations}
            selectedVariations={selectedVariations}
            onToggle={handleVariationToggle}
          />
          <DayWeekSelector timeRange={timeRange} onTimeRangeChange={setTimeRange} />
        </div>

        <div className={styles.chartControls}>
          <LineStyleSelector lineStyle={lineStyle} onLineStyleChange={setLineStyle} />
          <ZoomControls zoomEnabled={zoomEnabled} onZoomToggle={setZoomEnabled} />
        </div>

        <div className={styles.chartContainer}>
          <LineChart
            data={chartData.data}
            variations={variations}
            selectedVariations={selectedVariations}
            timeRange={timeRange}
            lineStyle={lineStyle}
            isDarkTheme={isDarkTheme}
            zoomEnabled={zoomEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
