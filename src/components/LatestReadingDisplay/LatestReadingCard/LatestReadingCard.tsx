import { Paper, Text } from "@mantine/core";
import { dataLabels } from "../../../utils";

export const LatestReadingCard = (props: {
  measurement: string;
  reading: number;
}) => {
  const { label, unit } = dataLabels[props.measurement];

  return (
    <Paper shadow="xs" p="sm">
      <Text>{label}</Text>
      <Text>
        {props.reading}
        {unit}
      </Text>
    </Paper>
  );
};
