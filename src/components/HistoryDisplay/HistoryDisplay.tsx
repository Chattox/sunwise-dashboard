import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateRangePicker } from "./DateRangePicker/DateRangePicker";
import { dataLabels, getAllReadings, getDateRangeReadings } from "../../utils";
import { formatReadings } from "../../utils/formatReadings";
import { getIndividualReadingHistory } from "../../utils/getIndividualReadingHistory";
import { ReadingAreaChart } from "./charts/ReadingAreaChart";
import { Accordion, Grid, Paper, Stack, Text } from "@mantine/core";
import { ReadingBarChart } from "./charts/ReadingBarChart";
import { ReadingRadarChart } from "./charts/ReadingRadarChart";
import { getWindDirData } from "../../utils/getWindData";
import { Sparkline } from "@mantine/charts";
import { downsampleData } from "../../utils/downsampleData";
import { MAX_DATA_POINTS } from "../../utils/consts";

export const HistoryDisplay = (props: {
  station: string;
  isMobile: boolean;
}) => {
  const [readingsHistory, setReadingsHistory] = useState<FormattedReading[]>(
    []
  );
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(
    dayjs().startOf("day")
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs());
  const [prevStart, setPrevStart] = useState<dayjs.Dayjs>(
    dayjs().startOf("day")
  );
  const [prevEnd, setPrevEnd] = useState<dayjs.Dayjs>(dayjs().startOf("day"));
  const [period, setPeriod] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileVal, setMobileVal] = useState<string | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

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
    if (period === "all") {
      setLoading(true);
      getAllReadings(props.station).then((res) => {
        setReadingsHistory(formatReadings(res));
        if (props.station) {
          setLoading(false);
        }
      });
    } else if (
      isFirstLoad ||
      !startDate.isSame(prevStart) ||
      !endDate.isSame(prevEnd)
    ) {
      setLoading(true);
      getDateRangeReadings(
        props.station,
        startDate.toISOString(),
        endDate.toISOString()
      ).then((res) => {
        setReadingsHistory(formatReadings(res));
        if (props.station) {
          setPrevStart(startDate);
          setPrevEnd(endDate);
          setLoading(false);
          setIsFirstLoad(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getHistoryDisplays = () =>
    Object.keys(dataLabels).map((measurement: string) => {
      const rawData = getIndividualReadingHistory(readingsHistory, measurement);
      const data =
        rawData.length > MAX_DATA_POINTS
          ? downsampleData(rawData, measurement)
          : rawData;

      return (
        <Grid.Col span={4} key={dataLabels[measurement].label}>
          <Paper p="sm" bg="none">
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

  const getMobileHistoryDisplays = () => {
    return Object.keys(dataLabels).map((measurement: string) => {
      const rawData = getIndividualReadingHistory(readingsHistory, measurement);
      const data =
        rawData.length > MAX_DATA_POINTS
          ? downsampleData(rawData, measurement)
          : rawData;
      const sparkData = data.map((i) => i[measurement] as number);

      const sparkChart = (
        <Sparkline
          w="5rem"
          h="3rem"
          data={sparkData}
          color={dataLabels[measurement].color}
          curveType="natural"
          fillOpacity={0.5}
        />
      );

      return (
        <Accordion.Item key={measurement} value={measurement}>
          <Accordion.Control
            icon={mobileVal === measurement ? null : sparkChart}
          >
            {dataLabels[measurement].label}
          </Accordion.Control>
          <Accordion.Panel>
            {mobileVal === measurement ? (
              <Paper bg="none">
                {data.length > 0 ? (
                  getChart(data, measurement)
                ) : (
                  <Text ta="center">No data</Text>
                )}
              </Paper>
            ) : null}
          </Accordion.Panel>
        </Accordion.Item>
      );
    });
  };

  return (
    <Stack align="flex-start">
      <DateRangePicker
        dateRange={[startDate, endDate]}
        setDateRange={setDateRange}
        period={period}
        setPeriod={setPeriod}
      />
      {loading ? (
        <Text>Loading</Text>
      ) : props.isMobile ? (
        <Accordion
          w="100%"
          chevronPosition="left"
          value={mobileVal}
          onChange={setMobileVal}
          transitionDuration={0}
        >
          {getMobileHistoryDisplays()}
        </Accordion>
      ) : (
        <Grid w="100%">{getHistoryDisplays()}</Grid>
      )}
    </Stack>
  );
};
