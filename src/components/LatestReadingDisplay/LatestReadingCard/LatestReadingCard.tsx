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
import { COMPASS_DIRECTIONS_FULL } from "../../../utils/consts";

export const LatestReadingCard = (props: {
  measurement: string;
  reading: number;
}) => {
  const { label, unit, color = "gray.6", icon } = dataLabels[props.measurement];
  const theme = useMantineTheme();

  return (
    <Paper miw={275} bg="none">
      <Divider size="xl" color={color} mb="xs" />
      <Group>
        {icon ? icon(48, parseThemeColor({ color, theme }).value) : ""}
        <Stack gap={0}>
          <Text size="lg">{label}</Text>
          <Group gap="xs">
            {props.measurement === "windDirection" ? (
              <Text className={classes.reading}>
                {COMPASS_DIRECTIONS_FULL[props.reading]}
              </Text>
            ) : (
              <>
                <Text className={classes.reading}>{props.reading}</Text>
                <Text className={classes.unit}>{unit}</Text>
              </>
            )}
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};
