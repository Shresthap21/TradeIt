// import React, { useMemo } from "react";
// import ApexCharts from "react-apexcharts";

// const DualLineChart = ({
//   line1Data,
//   line2Data,
//   oversoldData,
//   overboughtData,
//   name1 = "S&P 500 Index",
//   name2 = "Indicator",
//   threshold
// }) => {
//   const series = useMemo(
//     () => {
//       const seriesData = [
//         {
//           name: name1,
//           type: "line",
//           data: line1Data[0]?.Date
//             ? line1Data.map((item) => ({
//                 x: item.Date,
//                 y: item.Close,
//               }))
//             : [],
//         },
//         ...(line2Data && line2Data.length > 0 ? [{
//           name: name2,
//           type: "line",
//           data: line2Data[0]?.Date
//             ? line2Data.map((item) => ({
//                 x: item.Date,
//                 y: item.indicator,
//               }))
//             : [],
//         }] : [])
//       ];

//       return seriesData;
//     },
//     [line1Data, line2Data, name1, name2]
//   );

//   const options = useMemo(
//     () => ({
//       chart: {
//         type: "line",
//         height: 550,
//         animations: { enabled: false },
//         zoom: {
//           enabled: true,
//           type: "x",
//           autoScaleYaxis: true,
//         },
//         toolbar: { show: true },
//       },
//       colors: ["#008FFB", "#f5a742"],
//       stroke: {
//         width: 2,
//         curve: "smooth",
//       },
//       grid: {
//         show: true,
//         borderColor: "#e3e3e3",
//         strokeDashArray: 0,
//         position: "back",
//       },
//       markers: {
//         size: 0,
//         hover:{
//           size:3
//         }
//       },
//       annotations: {
//         yaxis: line2Data && line2Data.length > 0 ? [
//           {
//             y: threshold,
//             yAxisIndex:1,
//             borderColor: '#000000',
//             borderWidth: 1,
//             borderStyle: 'solid',
//             label: {
//               borderColor: '#000000',
//               style: {
//                 color: '#fff',
//                 background: '#000000'
//               },
              
//             }
//           }
//         ] : [],
//         points: [
//           // Oversold points (green upward triangles)
//           ...(oversoldData?.length > 0 && oversoldData[0] && oversoldData[0][0]
//             ? oversoldData.map((point) => ({
//                 x: point[0],
//                 y: point[1],
//                 marker: {
//                   size: 2,
//                   fillColor: "#3d9c2f", 
//                   strokeColor: "#3d9c2f",
//                   shape: "triangle",
//                 },
//               }))
//             : []),
          
//           // Overbought points (red downward triangles)
//           ...(overboughtData?.length > 0 && overboughtData[0] && overboughtData[0][0]
//             ? overboughtData.map((point) => ({
//                 x: point[0],
//                 y: point[1],
//                 marker: {
//                   size: 2,
//                   fillColor: "#FF4560", 
//                   strokeColor: "#FF4560",
//                   path: `
//               M 0 0 
//               L 6 10 
//               L -6 10 
//               Z
//             `, 
                  
//                 },
//               }))
//             : []),
//         ],
//       },
//       xaxis: {
//         type: "datetime",
//         labels: {
//           datetimeUTC: false,
//           format: "yyyy-MM-dd",
//         },
//       },
//       yaxis: [
//         {
//           seriesName: name1,
//           title: {
//             text: name1,
//             style:{
//               color:'#008FFB'
//             }
//           },
//           labels: {
//             formatter: (value) => value.toFixed(2),
//           },
//         },
//         ...(line2Data && line2Data.length > 0 ? [{
//           seriesName: name2,
//           opposite: true,
//           title: {
//             text: name2,
//             style:{
//               color:'#f5a742'
//             }
//           },
//           min: 0,
//           max: 1,
//           labels: {
//             formatter: (value) => value.toFixed(2),
//           },
//         }] : [])
//       ],
//       tooltip: {
//         enabled: true,
//         shared: true,
//         intersect: false,
//         custom: function ({ series, seriesIndex, dataPointIndex, w }) {
//           const seriesValues = series;
//           const timestamps = w.globals.seriesX[0];

//           const tooltipContent = seriesValues.map((seriesItem, index) => {
//             const value = seriesItem[dataPointIndex];
//             const name = index === 0 ? name1 : name2;
//             return `<div>${name}: ${value.toFixed(2)}</div>`;
//           }).join('');
//             console.log("TOOLTIP",tooltipContent)
//           return `
//             <div class="bg-black bg-opacity-5 hidden backdrop-blur-sm text-black p-2 rounded-md shadow-lg text-xs">
//               ${tooltipContent}
//               <div>Date: ${new Date(
//                 timestamps[dataPointIndex]
//               ).toLocaleDateString()}</div>
//             </div>
//           `;
//         },
//         marker: false,
//         x: {
//           format: "yyyy-MM-dd",
//         },
//       },
//       legend: {
//         show: false,
//       },
//     }),
//     [oversoldData, overboughtData, line1Data, line2Data, name1, name2, threshold]
//   );

//   return (
//     <div className="block min-h-full">
//       <ApexCharts
//         options={options}
//         series={series}
//         type="line"
//         height={250}
//         width="100%"
//       />
//     </div>
//   );
// };

// export default React.memo(DualLineChart);



// import React, { useMemo } from "react";
// import ApexCharts from "react-apexcharts";

// const DualLineChart = ({
//   line1Data,
//   line2Data,
//   oversoldData,
//   overboughtData,
//   name1 = "S&P 500 Index",
//   name2 = "Indicator",
//   threshold
// }) => {
//   const series = useMemo(
//     () => {
//       const seriesData = [
//         {
//           name: name1,
//           type: "line",
//           data: line1Data[0]?.Date
//             ? line1Data.map((item) => ({
//                 x: item.Date,
//                 y: item.Close,
//               }))
//             : [],
//         },
//         ...(line2Data && line2Data.length > 0 ? [{
//           name: name2,
//           type: "line",
//           data: line2Data[0]?.Date
//             ? line2Data.map((item) => ({
//                 x: item.Date,
//                 y: item.indicator,
//               }))
//             : [],
//         }] : [])
//       ];

//       return seriesData;
//     },
//     [line1Data, line2Data, name1, name2]
//   );

//   const options = useMemo(
//     () => ({
//       chart: {
//         type: "line",
//         height: 550,
//         animations: { enabled: false },
//         zoom: {
//           enabled: true,
//           type: "x",
//           autoScaleYaxis: true,
//         },
//         toolbar: { show: true },
//       },
//       colors: ["#008FFB", "#f5a742"],
//       stroke: {
//         width: 2,
//         curve: "smooth",
//       },
//       grid: {
//         show: true,
//         borderColor: "#e3e3e3",
//         strokeDashArray: 0,
//         position: "back",
//       },
//       markers: {
//         size: 0,
//         hover: {
//           size: 3
//         }
//       },
//       annotations: {
//         yaxis: line2Data && line2Data.length > 0 ? [
//           {
//             y: threshold,
//             yAxisIndex: 1,
//             borderColor: '#000000',
//             borderWidth: 1,
//             borderStyle: 'solid',
//             label: {
//               text: 'Threshold',
//               borderColor: '#000000',
//               style: {
//                 color: '#fff',
//                 background: '#000000'
//               },
//             }
//           }
//         ] : [],
//         points: [
//           // Oversold points (green upward triangles)
//           ...(oversoldData?.length > 0 && oversoldData[0] && oversoldData[0][0]
//             ? oversoldData.map((point) => ({
//                 x: point[0],
//                 y: point[1],
//                 marker: {
//                   size: 2,
//                   fillColor: "#3d9c2f", 
//                   strokeColor: "#3d9c2f",
//                   shape: "triangle",
//                 },
//               }))
//             : []),
          
//           // Overbought points (red downward triangles)
//           ...(overboughtData?.length > 0 && overboughtData[0] && overboughtData[0][0]
//             ? overboughtData.map((point) => ({
//                 x: point[0],
//                 y: point[1],
//                 marker: {
//                   size: 2,
//                   fillColor: "#FF4560", 
//                   strokeColor: "#FF4560",
//                   path: `
//               M 0 0 
//               L 6 10 
//               L -6 10 
//               Z
//             `, 
//                 },
//               }))
//             : []),
//         ],
//       },
//       xaxis: {
//         type: "datetime",
//         labels: {
//           datetimeUTC: false,
//           format: "yyyy-MM-dd",
//         },
//       },
//       yaxis: [
//         {
//           seriesName: name1,
//           title: {
//             text: name1,
//             style: {
//               color: '#008FFB'
//             }
//           },
//           labels: {
//             formatter: (value) => value.toFixed(2),
//           },
//         },
//         ...(line2Data && line2Data.length > 0 ? [{
//           seriesName: name2,
//           opposite: true,
//           title: {
//             text: name2,
//             style: {
//               color: '#f5a742'
//             }
//           },
//           min: 0,
//           max: 1,
//           labels: {
//             formatter: (value) => value.toFixed(2),
//           },
//         }] : [])
//       ],
//       tooltip: {
//         enabled: true,
//         shared: true,
//         intersect: false,
//         custom: function ({ series, seriesIndex, dataPointIndex, w }) {
//           const seriesValues = series;
//           const timestamps = w.globals.seriesX[0];

//           const tooltipContent = seriesValues.map((seriesItem, index) => {
//             const value = seriesItem[dataPointIndex];
//             const name = w.config.series[index].name;
//             return `<div>${name}: ${value.toFixed(2)}</div>`;
//           }).join('');

//           return `
//             <div class="apexcharts-tooltip-custom bg-black bg-opacity-50 backdrop-blur-sm text-white p-2 rounded-md shadow-lg text-xs">
//               ${tooltipContent}
//               <div>Date: ${new Date(
//                 timestamps[dataPointIndex]
//               ).toLocaleDateString()}</div>
//             </div>
//           `;
//         },
//         marker: {
//           show: true,
//         },
//         x: {
//           format: "yyyy-MM-dd",
//         },
//       },
//       legend: {
//         show: false,
//       },
//     }),
//     [oversoldData, overboughtData, line1Data, line2Data, name1, name2, threshold]
//   );

//   return (
//     <div className="block min-h-full">
//       <ApexCharts
//         options={options}
//         series={series}
//         type="line"
//         height={250}
//         width="100%"
//       />
//     </div>
//   );
// };

// export default React.memo(DualLineChart);








import React, { useMemo } from "react";
import ApexCharts from "react-apexcharts";

const DualLineChart = ({
  line1Data,
  line2Data,
  oversoldData,
  overboughtData,
  name1 = "S&P 500 Index",
  name2 = "Indicator",
  threshold
}) => {
  const series = useMemo(
    () => {
      const seriesData = [
        {
          name: name1,
          type: "line",
          data: line1Data[0]?.Date
            ? line1Data.map((item) => ({
                x: item.Date,
                y: item.Close,
              }))
            : [],
        },
        ...(line2Data && line2Data.length > 0 ? [{
          name: name2,
          type: "line",
          data: line2Data[0]?.Date
            ? line2Data.map((item) => ({
                x: item.Date,
                y: item.indicator,
              }))
            : [],
        }] : [])
      ];

      return seriesData;
    },
    [line1Data, line2Data, name1, name2]
  );

  const options = useMemo(
    () => ({
      chart: {
        type: "line",
        height: 550,
        animations: { enabled: false },
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: true,
        },
        toolbar: { show: true },
      },
      colors: ["#008FFB", "#f5a742"],
      stroke: {
        width: 2,
        curve: "smooth",
      },
      grid: {
        show: true,
        borderColor: "#e3e3e3",
        strokeDashArray: 0,
        position: "back",
      },
      markers: {
        size: 0,
        hover: {
          size: 3
        }
      },
      annotations: {
        yaxis: line2Data && line2Data.length > 0 ? [
          {
            y: threshold,
            yAxisIndex: 1,
            borderColor: '#000000',
            borderWidth: 1,
            label: {
              text: '',
              style: {
                background: 'transparent',
                color: '#000000',
                fontSize: '12px',
                fontWeight: 'bold'
              },
            }
          }
        ] : [],
        points: [
          ...(oversoldData?.length > 0 && oversoldData[0] && oversoldData[0][0]
            ? oversoldData.map((point) => ({
                x: point[0],
                y: point[1],
                marker: {
                  size: 2,
                  fillColor: "#3d9c2f", 
                  strokeColor: "#3d9c2f",
                  shape: "triangle",
                },
              }))
            : []),
          
          ...(overboughtData?.length > 0 && overboughtData[0] && overboughtData[0][0]
            ? overboughtData.map((point) => ({
                x: point[0],
                y: point[1],
                marker: {
                  size: 2,
                  fillColor: "#FF4560", 
                  strokeColor: "#FF4560",
                  path: `
              M 0 0 
              L 6 10 
              L -6 10 
              Z
            `, 
                },
              }))
            : []),
        ],
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
          format: "yyyy-MM-dd",
        },
      },
      yaxis: [
        {
          seriesName: name1,
          title: {
            text: name1,
            style: {
              color: '#008FFB'
            }
          },
          tooltip:{
            enabled:true
          },
          labels: {
            formatter: (value) => value.toFixed(2),
          },
        },
        ...(line2Data && line2Data.length > 0 ? [{
          seriesName: name2,
          opposite: true,
          tooltip:{
            enabled:true
          },
          title: {
            text: name2,
            style: {
              color: '#f5a742'
            }
          },
          min: 0,
          max: 1,
          labels: {
            formatter: (value) => value.toFixed(2),
          },
        }] : [])
      ],
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        onDatasetHover: {
          highlightDataSeries: true
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const timestamps = w.globals.seriesX[0];
          const seriesNames = w.config.series.map(s => s.name);
          
          let tooltipContent = seriesNames.map((name, index) => {
            const value = series[index][dataPointIndex];
            return `<div>${name}: ${value.toFixed(2)}</div>`;
          }).join('');

          tooltipContent += `<div>Date: ${new Date(
            timestamps[dataPointIndex]
          ).toLocaleDateString()}</div>`;

          return `
            <div class="bg-black bg-opacity-50 backdrop-blur-sm hidden text-white p-2 rounded-md shadow-lg text-xs">
              ${tooltipContent}
            </div>
          `;
        },
        marker: {
          show: false,
        },
        x: {
          format: "yyyy-MM-dd",
        },
      },
      legend: {
        show: false,
      },
    }),
    [oversoldData, overboughtData, line1Data, line2Data, name1, name2, threshold]
  );

  return (
    <div className="block min-h-full">
      <ApexCharts
        options={options}
        series={series}
        type="line"
        height={250}
        width="100%"
      />
    </div>
  );
};

export default React.memo(DualLineChart);