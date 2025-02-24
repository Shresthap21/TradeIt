import React, { useEffect, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";
import dayjs from "dayjs";

const CandlestickChart = ({ candlestickData, annotationsData }) => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(800);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });


  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {


    const plot = Plot.plot({
      inset: 10,
      width: dimensions.width,
      height: dimensions.height,
      marginLeft: 50,
      marginBottom: 50,
      grid: true,
      x: {
        label: "Date",
        ticks:10,
        tickFormat: (d) => dayjs(d).format("YYYY-MM-DD"),
      },
      y: { label: "xyz" },
      color: { domain: [-1, 0, 1], range: ["#e41a1c", "#000000", "#4daf4a"] },
      marks: [
        Plot.ruleX(candlestickData, { x: "Date", y1: "Low", y2: "High" }),

        Plot.ruleX(candlestickData, {
          x: "Date",
          y1: "Open",
          y2: "Close",
          stroke: (d) => Math.sign(d.Close - d.Open),
          strokeWidth: 4,
        }),

        Plot.rect(annotationsData.buyZoneData, {
          x1: (d) => d.x1,
          x2: (d) => d.x2,
          y1: (d) => d.y1,
          y2: (d) => d.y2,
          fill: "green",
          fillOpacity: 0.3,
        }),

        Plot.ruleY(annotationsData.stopLossData, {
          x1: (d) => d.x1,
          x2: (d) => d.x2,
          y: (d) => d.y,
          stroke: "red",
          strokeWidth: 2,
        }),

        Plot.ruleX([{ x: annotationsData?.pivotTimestamp }], {
          x: "x",
          stroke: "blue",
          strokeWidth: 1,
          strokeDasharray: "4,4",
          title: "Pivot Timestamp",
        }),

        Plot.ruleX([{ x: annotationsData.anchorTimestamp }], {
          x: "x",
          stroke: "orange",
          strokeWidth: 1,
          strokeDasharray: "4,4",
          title: "Anchor Timestamp",
        }),

        Plot.ruleY(annotationsData.targetLevels, {
          x1: (d) => d.x1,
          x2: (d) => d.x2,
          y: (d) => d.y,
          stroke: "blue",
          strokeDasharray: "4,4",
          strokeWidth: 2,
          title: (d) => d.name,
        }),
        Plot.ruleY(annotationsData.anchorSupport, {
          x1: (d) => d.x1,
          x2: (d) => d.x2,
          y: (d) => d.y,
          stroke: "black",
          strokeDasharray: "4,4",
          strokeWidth: 2,
        }),
      ],
    });

    if (chartRef.current) {
      chartRef.current.innerHTML = "";
      chartRef.current.appendChild(plot);
    }
  }, [dimensions, candlestickData, annotationsData]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative bg-white rounded-md p-10 shadow-sm"
      style={{ minHeight: "" }}
    >
      <div className="" ref={chartRef}></div>
    </div>
  );
};

export default CandlestickChart;
