import { Switch } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import ApexCharts from "react-apexcharts";
import SwitchBtn from "./SwitchBtn";
import dayjs from "dayjs";

const CandlestickChart2 = ({
  enableAnnotation=true,
  candlestickData,
  annotationsData,
  withTIme = false,
  name,
}) => {
  const [selected, setSelected] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
console.log(candlestickData)
  const formatDate = (timestamp) => {
 
    const date = new Date(timestamp);
    const formattedDate = withTIme
      ? dayjs(date).format("YYYY-MM-DD hh:mm A")
      : dayjs(date).format("YYYY-MM-DD");
    return formattedDate;
  };

  const series = useMemo(() => {
    const baseSeries = [
      {
        name: "Candlestick",
        type: "candlestick",
        data: candlestickData.map((item, index) => {
         return {
          x: ++index,
          y: [item.Open, item.High, item.Low, item.Close],
        }
      }
      
      
    ),
      },
    ];
    if (showVolume) {
      baseSeries.push({
        name: "Volume",
        type: "bar",
        data: candlestickData.map((item, index) => ({
          x: ++index,
          y: item.Volume,
        })),
        fill: {
          color: "#a6a6a6", // Set volume bar color
          opacity: 0.6, // Set lower opacity for volume bars
        },
        stroke: {
          color: "#a6a6a6", // Set volume bar border color
          width: 0, // Remove volume bar border
        },
      });
    }

    return baseSeries;
  }, [candlestickData, showVolume]);


  const findAnnotationIndices = (timestamp) => {
    let index = candlestickData.findIndex((item) => item.Date === timestamp);
    return index !== -1 ? ++index : -1;
  };

  const options = useMemo(
    () => ({
      chart: {
        type: "candlestick",
        height: 750,
        animations: {
          enabled: false,
        },
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: true,
        },
        plotOptions: {
          bar: {
            columnWidth: "50%", // Adjust bar width if needed
            colors: {
              ranges: [
                {
                  from: 0,
                  to: Number.MAX_SAFE_INTEGER,
                  color: "#a6a6a6", // Set volume bar color
                },
              ],
            },
          },
        },
      },
      colors: ["#a6a6a6"],
      grid: {
        show: true,
        opacity: 0,
        borderColor: "#e3e3e3",
        strokeDashArray: 0,
        strokeWidth: 0.5,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      title: {
        text: `${name}`,
        align: "left",
      },
      xaxis: {
        type: "category",
        categories: candlestickData.map((item) => formatDate(item.Date)),
        tickAmount: 5,
      },
      yaxis: [
        {
          seriesName: "Candlestick",
          min: annotationsData?.yRange?.ymin,
          max: annotationsData?.yRange?.ymax,
          opposite: true,

          tooltip: {
            enabled: true,
          },
        },
        ...(showVolume
          ? [
              {
                seriesName: "Volume",
                min: 0,
                max: annotationsData?.yRange?.volume_ymax,
                opposite: false,
                show:false,
                labels: {
                  show: false
                }
              },
            ]
          : []),
      ],
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
          const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
          const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
          const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];

          return `
            <div class="bg-black bg-opacity-5 hidden backdrop-blur-sm text-black p-2 rounded-md shadow-lg text-xs">
              <div>Open: ${o}</div>
              <div>High: ${h}</div>
              <div>Low: ${l}</div>
              <div>Close: ${c}</div>
            </div>
          `;
        },
        marker: false,
      },
      annotations: {
        xaxis: [
          {
            x: findAnnotationIndices(annotationsData.pivotTimestamp),
            borderColor: "#5d58ed",
            strokeDashArray: 4,
            label: {
              text: selected ? "Pivot Timestamp" : "",
              style: { color: "#5d58ed" },
              orientation: "vertical",
            },
          },
          {
            x: findAnnotationIndices(annotationsData.anchorTimestamp),
            borderColor: "#e6a153",
            strokeDashArray: 4,
            label: {
              text: selected ? "Anchor Timestamp" : "",
              style: { color: "#e6a153" },
              orientation: "vertical",
            },
          },
        ],
        yaxis: [
          ...annotationsData.buyZoneData
            .map((zone) => {
              return {
                y: zone.y1,
                y2: zone.y2,
                fillColor: "rgba(0, 255, 150, 0.2)",
                borderColor: "#00E396",
                opacity: 0.4,
                label: {
                  text: selected ? "Buy Zone" : "",
                  style: {
                    color: "#00E396",
                    fontWeight: "bold",
                  },
                },
              };
            })
            .filter(Boolean),

          ...annotationsData.targetLevels.map((level) => ({
            y: level.y,
            borderColor: "#008FFB",
            strokeDashArray: 4,

            label: {
              text: selected ? level.name : "",
              style: { color: "#008FFB" },
            },
          })),

          ...(annotationsData.stopLossData[0]?.y &&
          annotationsData.stopLossData.length > 0
            ? annotationsData.stopLossData.map((level) => ({
                y: level.y,
                borderColor: "#ed0000",
                strokeDashArray: 4,
                label: {
                  text: selected ? "Stop Loss" : "",
                  style: { color: "#ed0000", fontWeight: "Bold" },
                },
              }))
            : []),

          ...annotationsData.anchorSupport.map((support) => ({
            y: support.y,
            borderColor: "#775DD0",
            strokeDashArray: 4,

            label: {
              text: selected ? support.name : "",
              style: { color: "#775DD0" },
            },
          })),

          ...(annotationsData.anchorSrLod &&
          annotationsData.anchorSrLod?.length > 0
            ? annotationsData.anchorSrLod.map((support) => ({
                y: support.y,
                borderColor: "#7d7c7c",
                strokeDashArray: 4,

                label: {
                  text: selected ? support.name : "",
                  style: { color: "#7d7c7c" },
                },
              }))
            : []),
        ],
      },
      legend: {
        show: false,
      },
    }),
    [annotationsData, candlestickData, selected, name, showVolume]
  );

  return (
    <div className="block min-h-full">
      <div className="flex justify-start text-xs my-3 space-x-4">
      {enableAnnotation &&  <SwitchBtn
          title="Annotations"
          selected={selected}
          setSelected={setSelected}
        />}
        <SwitchBtn
          title="Volume"
          selected={showVolume}
          setSelected={setShowVolume}
        />
      </div>
      <ApexCharts
        className="cursor-crosshair"
        options={options}
        series={series}
        type="candlestick"
        height={550}
        width="100%"
      />
    </div>
  );
};

export default React.memo(CandlestickChart2);
