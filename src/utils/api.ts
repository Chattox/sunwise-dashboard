import axios from "axios";
const dbUrl = import.meta.env.PUBLIC_DB_URL;

/**
 * Get latest reading from target station
 *
 * @param {string} station Name of target station
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
 */
export const getDateRangeReadings = (
  station: string,
  startDate: string,
  endDate: string
) => {
  return axios
    .get(`${dbUrl}/daterange`, {
      params: { station: station, startdate: startDate, enddate: endDate },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
