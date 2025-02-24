import React from "react";
import TooltipWrapper from "./TooltipWrapper";

const PerformanceContainer = ({ color, panel = [] }) => {
  const colorMap = {
    lightgreen: "#d1ffe0",
    lightred: "#faa7ac",
    green: "#22c55e",
    red: "#ef4444",
    black: "#000000",
    grey: "#808080",
  };

  const sortedPanel = [...panel].sort((a, b) => a.value - b.value);

  const minValue = sortedPanel[0]?.value || 0;
  const maxValue = sortedPanel[sortedPanel.length - 1]?.value || 1;

  const MIN_SPACING = 3;

  const calculatePositions = () => {
    const positions = sortedPanel.map(
      (e) => ((e.value - minValue) / (maxValue - minValue)) * 100
    );

    for (let i = 1; i < positions.length; i++) {
      if (positions[i] - positions[i - 1] < MIN_SPACING) {
        positions[i] = positions[i - 1] + MIN_SPACING;
      }
    }

    return positions;
  };

  const positions = calculatePositions();

  return (
    <div className="flex flex-col gap-y-1 w-[15rem]">
      <div style={{ borderColor: colorMap[color] }} className="px-4 border">
        <div className="relative w-full h-8 flex items-end">
          {sortedPanel.map((e, idx) => (
            <TooltipWrapper
              key={idx}
              hoverMsg={e.name + " (" + e.value.toFixed(2) + ")"}
            >
              <div
                style={{
                  left: `${positions[idx]}%`,
                  backgroundColor: colorMap[e.color],
                }}
                className="absolute h-6 w-[3px] rounded cursor-pointer"
              ></div>
            </TooltipWrapper>
          ))}
        </div>
      </div>

      <div className="px-4">
        <div className="flex justify-between text-[10px] relative">
          {sortedPanel.map((e, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-center items-center bg-white p-[2px] rounded-sm shadow-sm border"
              style={{
                position: "absolute",
                left: `${positions[idx]}%`,
              }}
            >
              <span className="font-medium">{e.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceContainer;
