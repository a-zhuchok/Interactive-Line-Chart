import React from "react";
import styles from "./ZoomControls.module.css";

interface ZoomControlsProps {
  zoomEnabled: boolean;
  onZoomToggle: (enabled: boolean) => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoomEnabled, onZoomToggle }) => {
  return (
    <div className={styles.controls}>
      <button
        className={`${styles.button} ${zoomEnabled ? styles.active : ""}`}
        onClick={() => onZoomToggle(!zoomEnabled)}
      >
        {zoomEnabled ? "Zoom Enabled" : "Enable Zoom"}
      </button>
    </div>
  );
};

export default ZoomControls;
