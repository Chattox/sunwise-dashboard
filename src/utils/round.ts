/**
 * Rounds given number to 2 decimal places
 *
 * @param {number} num Number to be rounded
 * @returns {number} Rounded number
 */
export const round = (num: number): number => {
  return Math.round(num * 100) / 100;
};
