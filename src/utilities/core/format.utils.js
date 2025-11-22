import {format, isValid, parse} from 'date-fns';
import {parsePhoneNumberWithError} from 'libphonenumber-js';

/**
 * @param {Date | number} [date] - The date to format. If not provided, returns an empty string.
 * @param {boolean} [time=false] - Whether to include time in the format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date, time = false) => {
  return date && isValid(date)
    ? format(date, `yyyy-MM-dd${time ? ` HH:mm` : ''}`)
    : '';
};

/**
 * @param {Date | number} date
 * @returns {string} The formatted time string.
 */
export const formatTime = (date) => {
  return date && isValid(date) ? format(date, `HH:mm`) : '';
};

/**
 * @param {string} date
 * @returns {Date} The parsed date object.
 */
export const parseDate = (date) => {
  return parse(date, 'yyyy-MM-dd', new Date());
};

/**
 * @param {string} phone
 * @returns {string} The formatted phone.
 */
export const formatPhoneNumber = (phone) => {
  try {
    return parsePhoneNumberWithError(phone).formatInternational();
  } catch {
    return undefined;
  }
};
