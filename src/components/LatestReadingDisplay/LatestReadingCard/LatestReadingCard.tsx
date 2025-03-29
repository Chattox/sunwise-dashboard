import {
  Divider,
  Group,
  Paper,
  parseThemeColor,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { dataLabels } from "../../../utils";
import classes from "./LastReadingCard.module.css";

export const LatestReadingCard = (props: {
  measurement: string;
  reading: number;
}) => {
  const { label, unit, color = "gray.6", icon } = dataLabels[props.measurement];
  const theme = useMantineTheme();

  return (
    <Paper classNames={{ root: classes.cardRoot }} bg="none">
      <Divider size="xl" color={color} />
      <Group>
        {icon ? icon(48, parseThemeColor({ color, theme }).value) : ""}
        <Stack gap="xs">
          <Text size="lg">{label}</Text>
          <Group gap="xs">
            <Text className={classes.reading}>{props.reading}</Text>
            <Text className={classes.unit}>{unit}</Text>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};
