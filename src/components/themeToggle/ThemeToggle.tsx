import React from "react";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: (isDark: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button className={styles.toggle} onClick={() => onToggle(!isDark)}>
      {isDark ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
