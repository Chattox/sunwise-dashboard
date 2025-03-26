import { round } from "./round";
/**
 * Formats readings returned from API, adjusting attribute names and rounding to 2sf
 *
 * @param readings {Reading[]} Array of unformatted readings
 *
 * @returns {FormattedReading[]} Array of formatted readings
 */
export const formatReadings = (readings: Reading[]): FormattedReading[] => {
  return readings.map((reading) => {
    return {
      stationName: reading.station_name,
      timestamp: reading.timestamp,
      data: {
        temperature: round(reading.data.temperature),
        humidity: round(reading.data.humidity),
        pressure: round(reading.data.pressure),
        luminance: round(reading.data.luminance),
        windSpeed: round(reading.data.wind_speed),
        gustSpeed: round(reading.data.gust_speed),
        windDirection: round(reading.data.wind_direction),
        rain: round(reading.data.rain),
      },
    };
  });
};
