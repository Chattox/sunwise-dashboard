import { useEffect, useState } from "react";
import { getLatestReading } from "../../utils";
import { Group } from "@mantine/core";
import { LatestReadingCard } from "./LatestReadingCard";
import { formatReadings } from "../../utils/formatReadings";

export const LatestReadingDisplay = (props: { station: string }) => {
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
    <Group>
      {Object.keys(latestReading.data).map((measurement: string) => (
        <LatestReadingCard
          measurement={measurement}
          reading={latestReading.data[measurement]}
          key={measurement}
        />
      ))}
    </Group>
  );

  return <>{loading ? <p>Loading</p> : display}</>;
};
