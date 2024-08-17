import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

interface RadarChartProps {
  width: string;
  height: string;
  labelEnable: boolean;
  enabled?: boolean;
  data?: number[];
  categories?: string[];
  name: string;
  titleEnabled?: boolean;
}

HighchartsMore(Highcharts);

const RadarChart: React.FC<RadarChartProps> = ({
  width,
  height,
  labelEnable,
  enabled,
  data,
  categories,
  name,
  titleEnabled,
}) => {
  const options: Highcharts.Options = {
    chart: {
      polar: true,
      type: "area",
      width: parseInt(width),
      height: parseInt(height),
      backgroundColor: "#F9F9F9",
      borderRadius: 8,
    },
    pane: {
      size: "105%",
      center: ["50%", "50%"],
      startAngle: 0,
      endAngle: 360,
    },
    title: {
      text: titleEnabled ? name : "",
    },
    legend: {
      enabled: enabled,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: categories,
      tickmarkPlacement: "on",
      lineWidth: 0,
      labels: {
        enabled: labelEnable,
      },
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
      max: 10,
      tickInterval: 1,
      minorTickInterval: 1,
      gridLineColor: "#cccccc",
      minorGridLineColor: "#eeeeee",
      labels: {
        enabled: labelEnable,
      },
    },
    series: [
      {
        type: "area",
        name: name,
        data: data,
        pointPlacement: "on",
        color: "#E5AB16",
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, Highcharts.color("#f7e6ba").setOpacity(0.5).get()], // Adjust fill opacity as needed
            [1, Highcharts.color("#f7e6ba").setOpacity(0.5).get()],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
      },
    ] as Highcharts.SeriesOptionsType[],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default RadarChart;
