import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateRangePicker } from "./DateRangePicker/DateRangePicker";
import { dataLabels, getAllReadings, getDateRangeReadings } from "../../utils";
import { formatReadings } from "../../utils/formatReadings";
import { getIndividualReadingHistory } from "../../utils/getIndividualReadingHistory";
import { ReadingAreaChart } from "./charts/ReadingAreaChart";
import { Grid, Paper, Stack, Text } from "@mantine/core";
import { ReadingBarChart } from "./charts/ReadingBarChart";
import { ReadingRadarChart } from "./charts/ReadingRadarChart";
import { getWindDirData } from "../../utils/getWindData";

export const HistoryDisplay = (props: { station: string }) => {
  const [readingsHistory, setReadingsHistory] = useState<FormattedReading[]>(
    []
  );
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(
    dayjs().startOf("day")
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs());
  const [period, setPeriod] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const chartTypes: Record<string, string> = {
    temperature: "area",
    humidity: "area",
    pressure: "area",
    luminance: "area",
    windSpeed: "area",
    gustSpeed: "area",
    windDirection: "radar",
    rain: "bar",
    cumulativeRain: "area",
  };

  useEffect(() => {
    setLoading(true);
    if (period === "all") {
      getAllReadings(props.station).then((res) => {
        setReadingsHistory(formatReadings(res));
        if (props.station) {
          setLoading(false);
        }
      });
    } else {
      getDateRangeReadings(
        props.station,
        startDate.toISOString(),
        endDate.toISOString()
      ).then((res) => {
        setReadingsHistory(formatReadings(res));
        if (props.station) {
          setLoading(false);
        }
      });
    }
  }, [props.station, startDate, endDate, period]);

  const setDateRange = (dates: dayjs.Dayjs[]) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  const getChart = (data: IndividualReading[], measurement: string) => {
    switch (chartTypes[measurement]) {
      case "area":
        return <ReadingAreaChart data={data} measurement={measurement} />;
      case "bar":
        return <ReadingBarChart data={data} measurement={measurement} />;
      case "radar":
        return (
          <ReadingRadarChart
            data={getWindDirData(readingsHistory)}
            measurement={measurement}
          />
        );
      default:
        return undefined;
    }
  };

  const historyDisplays = Object.keys(dataLabels).map((measurement: string) => {
    const data = getIndividualReadingHistory(readingsHistory, measurement);

    return (
      <Grid.Col span={4} key={dataLabels[measurement].label}>
        <Paper shadow="xs" p="sm">
          <Stack h="100%" justify="flex-start">
            <Text size="lg" fw={500} pl={16}>
              {dataLabels[measurement].label}
            </Text>
            {data.length > 0 ? (
              getChart(data, measurement)
            ) : (
              <Text ta="center">No data</Text>
            )}
          </Stack>
        </Paper>
      </Grid.Col>
    );
  });

  return (
    <Stack align="flex-start">
      <DateRangePicker
        dateRange={[startDate, endDate]}
        setDateRange={setDateRange}
        period={period}
        setPeriod={setPeriod}
      />
      {loading ? <Text>Loading</Text> : <Grid w="100%">{historyDisplays}</Grid>}
    </Stack>
  );
};
