import { useEffect, useState } from "react";
import { getLatestReading } from "../../utils";
import { Group } from "@mantine/core";
import { LatestReadingCard } from "./LatestReadingCard";

export const LatestReadingDisplay = (props: { station: string }) => {
  const [latestReading, setLatestReading] = useState<Reading>({
    station_name: "wang",
    timestamp: "",
    data: {
      temperature: 0,
    },
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (props.station) {
      getLatestReading(props.station)
        .then((res) => {
          setLatestReading(res);
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
