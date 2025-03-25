import { Group, Paper, Text } from "@mantine/core";
import { dataLabels } from "../../../utils";
import classes from "./LastReadingCard.module.css";

export const LatestReadingCard = (props: {
  measurement: string;
  reading: number;
}) => {
  const { label, unit } = dataLabels[props.measurement];

  return (
    <Paper
      shadow="xs"
      radius="xs"
      p="sm"
      classNames={{ root: classes.cardRoot }}
    >
      <Text className={classes.label}>{label}</Text>
      <Group justify="center" gap="xs">
        <Text className={classes.reading}>{props.reading}</Text>
        <Text className={classes.unit}>{unit}</Text>
      </Group>
    </Paper>
  );
};
