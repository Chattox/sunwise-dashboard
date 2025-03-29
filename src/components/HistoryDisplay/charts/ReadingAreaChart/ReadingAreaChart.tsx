import { AreaChart, ChartReferenceLineProps } from "@mantine/charts";
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

  const referenceLine: ChartReferenceLineProps[] = [];

  if (props.measurement === "temperature") {
    let belowZero = false;
    chartData.forEach((reading: IndividualReading) => {
      if ((reading.temperature as number) < 0) {
        belowZero = true;
      }
    });
    if (belowZero) referenceLine.push({ y: 0, label: "0 °C", color: "cyan.6" });
  }

  return (
    <Stack align="flex-end">
      <AreaChart
        h={300}
        data={chartData}
        dataKey="timestamp"
        series={[{ name: props.measurement, label: label, color: lineColor }]}
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
        referenceLines={referenceLine}
      />
      <ChartMinMax data={props.data} measurement={props.measurement} />
    </Stack>
  );
};
