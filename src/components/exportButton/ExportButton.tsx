import React from "react";
import styles from "./ExportButton.module.css";

const ExportButton: React.FC = () => {
  const handleExport = async () => {
    try {
      const importHtml2Canvas = new Function("specifier", "return import(specifier)");
      const html2canvasModule = (await importHtml2Canvas("html2canvas")) as Promise<{
        default: any;
      }>;
      const html2canvas = (await html2canvasModule).default;

      const chartElement =
        document.querySelector('[class*="chartContainer"]') ||
        document.querySelector('[class*="chartWrapper"]') ||
        document.querySelector(".recharts-wrapper");

      if (!chartElement) {
        alert("Chart element not found");
        return;
      }

      const canvas = await html2canvas(chartElement as HTMLElement, {
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = `ab-test-chart-${new Date().toISOString().split("T")[0]}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please install html2canvas: npm install html2canvas");
    }
  };

  return (
    <button className={styles.button} onClick={handleExport}>
      Export PNG
    </button>
  );
};

export default ExportButton;
