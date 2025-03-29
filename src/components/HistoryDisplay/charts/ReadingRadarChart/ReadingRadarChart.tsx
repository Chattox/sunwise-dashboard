import { RadarChart } from "@mantine/charts";
import { dataLabels } from "../../../../utils";
import { WindMinMax } from "../ChartMinMax";
import { Stack } from "@mantine/core";

export const ReadingRadarChart = (props: {
  data: WindDirData[];
  measurement: string;
}) => {
  const label = dataLabels[props.measurement].label;
  const lineColor = dataLabels[props.measurement].color || "gray.6";

  return (
    <Stack align="flex-end">
      <RadarChart
        h={300}
        w="100%"
        data={props.data}
        dataKey="dir"
        series={[{ name: "amount", label: label, color: lineColor }]}
      />
      <WindMinMax windData={props.data} />
    </Stack>
  );
};
