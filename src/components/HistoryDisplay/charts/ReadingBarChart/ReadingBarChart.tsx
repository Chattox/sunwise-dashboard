import { BarChart } from "@mantine/charts";
import { Stack } from "@mantine/core";
import { dataLabels } from "../../../../utils";
import { formatTimestamps } from "../../../../utils/formatTimestamps";
import { ChartMinMax } from "../ChartMinMax";

export const ReadingBarChart = (props: {
  data: IndividualReading[];
  measurement: string;
}) => {
  const label = dataLabels[props.measurement].label;
  const unit = dataLabels[props.measurement].unit;
  const lineColor = dataLabels[props.measurement].color || "gray.6";

  const chartData = formatTimestamps(props.data, props.measurement);
  return (
    <Stack align="flex-end">
      <BarChart
        h={300}
        data={chartData}
        unit={unit}
        dataKey="timestamp"
        series={[{ name: props.measurement, label: label, color: lineColor }]}
        yAxisProps={{
          domain: ["auto", "auto"],
          width: 70,
          tickLine: false,
          interval: 0,
        }}
        xAxisProps={{ tick: false }}
      />
      <ChartMinMax data={props.data} measurement={props.measurement} />
    </Stack>
  );
};
