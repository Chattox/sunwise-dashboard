import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DateRangePicker } from "./DateRangePicker/DateRangePicker";
import { dataLabels, getAllReadings, getDateRangeReadings } from "../../utils";
import { formatReadings } from "../../utils/formatReadings";
import { getIndividualReadingHistory } from "../../utils/getIndividualReadingHistory";

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
    windDirection: "rose",
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

  return (
    <>
      <DateRangePicker
        dateRange={[startDate, endDate]}
        setDateRange={setDateRange}
        period={period}
        setPeriod={setPeriod}
      />
    </>
  );
};
