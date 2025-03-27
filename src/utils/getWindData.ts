import { COMPASS_DIRECTIONS } from "./consts";

/**
 * Gets wind direction data for use in the wind direction radar chart
 *
 * @param {FormattedReading[]} readings Array of formatted readings
 * @returns {WindData[]} Array of formatted wind direction data
 */
export const getWindDirData = (readings: FormattedReading[]): WindDirData[] => {
  const windCount: Record<string, number> = {
    n: 0,
    ne: 0,
    e: 0,
    se: 0,
    s: 0,
    sw: 0,
    w: 0,
    nw: 0,
  };

  readings.forEach(
    (reading: FormattedReading) =>
      (windCount[
        COMPASS_DIRECTIONS[reading.data.windDirection].toLowerCase()
      ] += reading.data.windSpeed)
  );

  const windDirData: WindDirData[] = Object.keys(windCount).map(
    (dir: string): WindDirData => ({
      dir: dir.toUpperCase(),
      amount: windCount[dir],
    })
  );

  return windDirData;
};
