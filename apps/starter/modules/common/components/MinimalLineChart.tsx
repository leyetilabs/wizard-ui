import React from "react";
import {
  type Chart,
  type ChartArea,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { ChartProps, Line } from "react-chartjs-2";
import { defaultsDeep, random } from "lodash";

function getGradient(ctx: CanvasRenderingContext2D, chartArea: ChartArea) {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top,
  );
  gradient.addColorStop(0, "rgba(178, 245, 234, 0.1)");
  gradient.addColorStop(1, "rgba(178, 245, 234, 0.6)");

  return gradient;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const defaultOptions = {
  responsive: true,
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
      beginAtZero: true,
    },
  },
  elements: {
    point: { radius: 0, hoverRadius: 4, backgroundColor: "rgb(178, 245, 234)" },
    line: {
      borderWidth: 2,
      borderColor: "rgb(178, 245, 234)",
      backgroundColor: function (context: any) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) {
          // This case happens on initial chart load
          return;
        }
        return getGradient(ctx, chartArea);
      },
      fill: true,
    },
  },
  layout: {
    padding: {
      top: 30,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
};

const labels = [
  "January 2021",
  "February 2021",
  "March 2021",
  "April 2021",
  "May 2021",
  "June 2021",
  "July 2021",
  "August 2021",
  "September 2021",
  "October 2021",
  "November 2021",
  "December 2021",
  "January 2022",
  "February 2022",
  "March 2022",
  "April 2022",
  "May 2022",
  "June 2022",
  "July 2022",
  "August 2022",
  "September 2022",
  "October 2022",
  "November 2022",
  "December 2022",
];

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => random(0.6, 1, true)),
    },
  ],
};

type MinimalLineChart = {
  onHover?: (value: number) => void;
  onLeave?: () => void;
} & Omit<ChartProps<"line">, "data" | "plugins" | "type">;

export function MinimalLineChart({
  onHover,
  onLeave,
  ...props
}: MinimalLineChart) {
  const plugins = [
    {
      id: "verticalLine",
      beforeDraw: (chart: Chart) => {
        // @ts-expect-error
        const activeTooltip = chart.tooltip?._active;

        if (activeTooltip?.length) {
          const x = activeTooltip[0].element.x;
          const yAxis = chart.scales.y;
          const ctx = chart.ctx;
          let textAlign: CanvasTextAlign = "center";

          if (activeTooltip[0].index == 0) {
            textAlign = "left";
          }

          if (activeTooltip[0].index == labels.length - 1) {
            textAlign = "right";
          }

          // Add label
          ctx.font = "0.75rem 'Roboto Mono'";
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.fillText(labels[activeTooltip[0].index], x, 10);
          ctx.textAlign = textAlign;

          // Add line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, 20);
          ctx.lineTo(x, yAxis.bottom);
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.7";
          ctx.stroke();
          ctx.restore();
        }
      },
    },
    {
      id: "myEventCatcher",
      beforeEvent(chart: any, args: any) {
        const event = args.event;

        // Add onMouseOut
        if (event.type === "mouseout") {
          onLeave?.();
        }

        // Add onHover
        if (event.type === "mousemove") {
          const activeTooltip = chart.tooltip?._active;

          if (activeTooltip?.length) {
            const { datasetIndex, index } = activeTooltip[0];
            const dataValue = data.datasets[datasetIndex].data[index];
            onHover?.(dataValue);
          }
        }
      },
    },
  ];

  const deepOptions = defaultsDeep({}, defaultOptions);

  return (
    <Line options={deepOptions} data={data} plugins={plugins} {...props} />
  );
}
