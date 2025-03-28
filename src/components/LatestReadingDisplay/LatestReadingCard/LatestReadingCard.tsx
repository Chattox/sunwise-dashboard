import { Divider, Group, Paper, Text } from "@mantine/core";
import { dataLabels } from "../../../utils";
import classes from "./LastReadingCard.module.css";

export const LatestReadingCard = (props: {
  measurement: string;
  reading: number;
}) => {
  const { label, unit, color = "gray.6" } = dataLabels[props.measurement];

  return (
    <Paper classNames={{ root: classes.cardRoot }} bg="none">
      <Divider size="xl" color={color} />
      <Text className={classes.label}>{label}</Text>
      <Group justify="center" gap="xs">
        <Text className={classes.reading}>{props.reading}</Text>
        <Text className={classes.unit}>{unit}</Text>
      </Group>
    </Paper>
  );
};
