import { BarChart } from "@mantine/charts";
import { dataLabels } from "../../../../utils";

export const ReadingBarChart = (props: {
  data: IndividualReading[];
  measurement: string;
}) => {
  const label = dataLabels[props.measurement].label;
  return (
    <BarChart
      h={300}
      data={props.data}
      dataKey="timestamp"
      series={[{ name: props.measurement, label: label, color: "blue.6" }]}
    />
  );
};
