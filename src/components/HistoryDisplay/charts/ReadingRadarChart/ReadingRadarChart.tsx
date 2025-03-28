import { RadarChart } from "@mantine/charts";
import { dataLabels } from "../../../../utils";

export const ReadingRadarChart = (props: {
  data: WindDirData[];
  measurement: string;
}) => {
  const label = dataLabels[props.measurement].label;
  const lineColor = dataLabels[props.measurement].color || "gray.6";

  return (
    <RadarChart
      h={300}
      data={props.data}
      dataKey="dir"
      series={[{ name: "amount", label: label, color: lineColor }]}
    />
  );
};
