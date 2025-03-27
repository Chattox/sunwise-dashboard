import { round } from "./round";

/**
 * Calculate cumulative rainfall from given readings
 *
 * @param {FormattedReading[]} readings Array of formatted readings
 * @returns {IndividualReading[]} Array of individual readings
 */
export const getCumulativeRainfall = (
  readings: FormattedReading[]
): IndividualReading[] => {
  const accRainfall: IndividualReading[] = [];
  readings.forEach((reading) => {
    if (accRainfall.length > 0) {
      accRainfall.push({
        timestamp: reading.timestamp,
        cumulativeRain: round(
          reading.data.rain +
            (accRainfall[accRainfall.length - 1].cumulativeRain as number)
        ),
      });
    } else {
      accRainfall.push({
        timestamp: reading.timestamp,
        cumulativeRain: reading.data.rain,
      });
    }
  });
  return accRainfall;
};
