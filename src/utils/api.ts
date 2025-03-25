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
