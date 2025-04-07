import { useEffect, useState } from "react";
import { getLatestReading } from "../../utils";
import { Grid, Group, Stack, Text } from "@mantine/core";
import { LatestReadingCard } from "./LatestReadingCard";
import { formatReadings } from "../../utils/formatReadings";
import { formatSingleTimestamp } from "../../utils/formatTimestamps";
import classes from "./LatestReadingDisplay.module.css";

export const LatestReadingDisplay = (props: {
  station: string;
  isMobile: boolean;
}) => {
  const [latestReading, setLatestReading] = useState<FormattedReading>({
    stationName: "wang",
    timestamp: "",
    data: {
      temperature: 0,
      humidity: 0,
      pressure: 0,
      luminance: 0,
      windSpeed: 0,
      gustSpeed: 0,
      windDirection: 0,
      rain: 0,
    },
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (props.station) {
      getLatestReading(props.station)
        .then((res) => {
          setLatestReading(formatReadings([res])[0]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [props.station]);

  const display = (
    <Group w="100%" gap="xl" align="flex-start" grow>
      {Object.keys(latestReading.data).map((measurement: string) => (
        <LatestReadingCard
          measurement={measurement}
          reading={latestReading.data[measurement]}
          key={measurement}
        />
      ))}
    </Group>
  );

  const mobileDisplay = (
    <Grid gutter="xs">
      {Object.keys(latestReading.data).map((measurement: string) => (
        <Grid.Col span={6}>
          <LatestReadingCard
            measurement={measurement}
            reading={latestReading.data[measurement]}
            key={measurement}
          />
        </Grid.Col>
      ))}
    </Grid>
  );

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Stack>
          <Text className={classes.latest}>
            Latest reading:{" "}
            {latestReading.timestamp
              ? formatSingleTimestamp(latestReading.timestamp)
              : "N/A"}
          </Text>
          {props.isMobile ? mobileDisplay : display}
        </Stack>
      )}
    </>
  );
};
