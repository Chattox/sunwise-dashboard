import { AreaChart } from "@mantine/charts";
import { dataLabels } from "../../../../utils";

export const ReadingAreaChart = (props: {
  data: IndividualReading[];
  measurement: string;
}) => {
  console.log(props.data);
  const label = dataLabels[props.measurement].label;
  return (
    <AreaChart
      h={300}
      data={props.data}
      dataKey="timestamp"
      series={[{ name: props.measurement, label: label, color: "blue.6" }]}
    />
  );
};
