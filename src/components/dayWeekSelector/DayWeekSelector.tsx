import React from "react";
import { TimeRange } from "../../types";
import styles from "./DayWeekSelector.module.css";

interface DayWeekSelectorProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const DayWeekSelector: React.FC<DayWeekSelectorProps> = ({ timeRange, onTimeRangeChange }) => {
  return (
    <div className={styles.selector}>
      <label className={styles.label}>View:</label>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${timeRange === "day" ? styles.active : ""}`}
          onClick={() => onTimeRangeChange("day")}
        >
          Day
        </button>
        <button
          className={`${styles.button} ${timeRange === "week" ? styles.active : ""}`}
          onClick={() => onTimeRangeChange("week")}
        >
          Week
        </button>
      </div>
    </div>
  );
};

export default DayWeekSelector;
