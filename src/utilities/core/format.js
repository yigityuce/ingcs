import {format, isValid} from 'date-fns';

/**
 * @param {Date | number} [date] - The date to format. If not provided, returns an empty string.
 * @param {boolean} [time=false] - Whether to include time in the format.
 * @param {boolean} [noYears=false] - Whether to exclude the year from the format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date, time = false, noYears = false) => {
  return date && isValid(date)
    ? format(date, `dd-MMM${noYears ? '' : '-yyyy'}${time ? ` HH:mm` : ''}`)
    : '';
};

/**
 *
 * @param {Date | number} date
 * @returns {string} The formatted time string.
 */
export const formatTime = (date) => {
  return date && isValid(date) ? format(date, `HH:mm`) : '';
};
