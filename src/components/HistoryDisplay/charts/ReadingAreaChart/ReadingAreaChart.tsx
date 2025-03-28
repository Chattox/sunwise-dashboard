import { AreaChart } from "@mantine/charts";
import { dataLabels } from "../../../../utils";
import { Stack } from "@mantine/core";
import { ChartMinMax } from "../ChartMinMax";
import { formatTimestamps } from "../../../../utils/formatTimestamps";

export const ReadingAreaChart = (props: {
  data: IndividualReading[];
  measurement: string;
}) => {
  const label = dataLabels[props.measurement].label;
  const unit = dataLabels[props.measurement].unit;
  const lineColor = dataLabels[props.measurement].color || "gray.6";
  const chartData = formatTimestamps(props.data, props.measurement);

  return (
    <Stack align="flex-end">
      <AreaChart
        h={300}
        w="100%"
        data={chartData}
        dataKey="timestamp"
        series={[{ name: props.measurement, label: label, color: lineColor }]}
        withGradient
        unit={unit}
        yAxisProps={{
          domain: ["auto", "auto"],
          width: 70,
          tickLine: false,
          interval: 0,
        }}
        xAxisProps={{ tick: false }}
        curveType="bump"
        withDots={false}
      />
      <ChartMinMax data={props.data} measurement={props.measurement} />
    </Stack>
  );
};
