import React, { useState } from "react";

type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  onChange?: (range: [number, number]) => void;
};

export default function Slider({ min = 0, max = 1000, step = 10, value, onChange }: SliderProps) {
  const [range, setRange] = useState<[number, number]>(value || [min, max]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), range[1]);
    setRange([newMin, range[1]]);
    onChange?.([newMin, range[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), range[0]);
    setRange([range[0], newMax]);
    onChange?.([range[0], newMax]);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between text-xs text-gray-600">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
      <div className="flex items-center gap-2 cursor-pointer">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range[0]}
          onChange={handleMinChange}
          className="w-full accent-lime-600"
        />
      </div>
      <div className="flex justify-between text-xs">
        <span>Mín: ${min}</span>
        <span>Máx: ${max}</span>
      </div>
    </div>
  );
}
