import axios from "axios";
const dbUrl = import.meta.env.PUBLIC_DB_URL;

/**
 * Get latest reading from target station
 *
 * @param {string} station Name of target station
 * @returns {Reading} Latest reading from station
 */
export const getLatestReading = (station: string): Promise<Reading> => {
  return axios
    .get(`${dbUrl}/latest`, { params: { station: station } })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

/**
 * Get all readings from target station within given date range (inclusive)
 *
 * @param {string} station Name of target station
 * @param {string} startDate Timestamp string of start date
 * @param {string} endDate Timestamp string of end date
 * @returns {Array} Array of readings
 */
export const getDateRangeReadings = (
  station: string,
  startDate: string,
  endDate: string
): Promise<Reading[]> => {
  return axios
    .get(`${dbUrl}/daterange`, {
      params: { station: station, startdate: startDate, enddate: endDate },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

/**
 * Get entire history of readings from target station
 * Warning: For a station that's been running for a long time this could take a while
 *
 * @param {string} station Name of target station
 * @returns {Array} Array of readings
 */
export const getAllReadings = (station: string): Promise<Reading[]> => {
  return axios
    .get(`${dbUrl}/all`, { params: { station: station } })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
