import { getCumulativeRainfall } from "./getCumulativeRainfall";

export const getIndividualReadingHistory = (
  readings: FormattedReading[],
  measurement: string
): IndividualReading[] => {
  if (measurement === "cumulativeRain") {
    return getCumulativeRainfall(readings);
  } else {
    return readings.map((reading) => ({
      timestamp: reading.timestamp,
      reading: reading.data[measurement] as number,
    }));
  }
};
