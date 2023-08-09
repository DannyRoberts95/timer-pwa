import React, { useState } from "react";
import styles from "../Slider.module.css";
interface Props {
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<Props> = ({ value, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      type="range"
      min={1}
      max={90}
      step={1}
      value={sliderValue}
      onChange={handleChange}
    />
  );
};

export default Slider;
