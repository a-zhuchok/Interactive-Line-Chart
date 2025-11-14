import React from "react";
import { Variation } from "../../types";
import { getVariationKey } from "../../utils/dataProcessing";
import styles from "./VariationsSelector.module.css";

interface VariationsSelectorProps {
  variations: Variation[];
  selectedVariations: Set<string>;
  onToggle: (variationKey: string) => void;
}

const VariationsSelector: React.FC<VariationsSelectorProps> = ({
  variations,
  selectedVariations,
  onToggle,
}) => {
  return (
    <div className={styles.selector}>
      <label className={styles.label}>Variations:</label>
      <div className={styles.checkboxes}>
        {variations.map((variation) => {
          const key = getVariationKey(variation);
          const isSelected = selectedVariations.has(key);
          const isDisabled = isSelected && selectedVariations.size === 1;

          return (
            <label
              key={key}
              className={`${styles.checkboxLabel} ${isDisabled ? styles.disabled : ""}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(key)}
                disabled={isDisabled}
                className={styles.checkbox}
              />
              <span>{variation.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default VariationsSelector;
