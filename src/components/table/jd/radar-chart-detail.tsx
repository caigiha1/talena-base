import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

interface RadarChartProps {
  width?: string;
  height?: string;
  labelEnable: boolean;
  enabled?: boolean;
  data?: number[];
  categories?: string[];
  name: string;
  titleEnabled?: boolean;
}

HighchartsMore(Highcharts);

const RadarDetailChart: React.FC<RadarChartProps> = ({
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
      width: parseInt(width ?? "0"),
      height: parseInt(height ?? "0"),
      margin: [30, 30, 30, 30],
      backgroundColor: "#ffffff",
    },
    pane: {
      size: "80%",
      center: ["50%", "50%"],
      startAngle: 0,
      endAngle: 360,
    },
    title: {
      text: titleEnabled ? name : "",
    },
    legend: {
      enabled: enabled,
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
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
        distance: 40,
        style: {
          fontSize: "13px",
        },
        zIndex: 0,
      },
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
      max: 10,
      tickInterval: 0,
      minorTickInterval: 1,
      gridLineColor: "#e0e0e0",
      minorGridLineColor: "#f0f0f0",
      labels: {
        enabled: false,
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
          linearGradient: { x1: 1, y1: 1, x2: 1, y2: 1 },
          stops: [
            [0, Highcharts.color("#f7e6ba").setOpacity(0.4).get()],
            [1, Highcharts.color("#f7e6ba").setOpacity(0.4).get()],
          ],
        },
        marker: {
          radius: 3,
        },
        lineWidth: 1,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}",
          style: {
            textOutline: "none",
            crop: false,
          },
          align: "left",
          verticalAlign: "top",
          y: -10,
          x: 10,
        },
      },
    ] as Highcharts.SeriesOptionsType[],
  };

  return (
    <HighchartsReact
      containerProps={{
        style: {
          width: "100%",
          height: height,
        },
      }}
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default RadarDetailChart;
