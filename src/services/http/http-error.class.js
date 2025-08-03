export class HttpError {
  /**
   * @type {number} HTTP status code
   */
  statusCode;

  /**
   * @type {string} Request path
   */
  path;

  /**
   * @type {Date} Timestamp of the error
   */
  timestamp;

  /**
   * @type {string[]} Error message(s)
   */
  message;

  /**
   *
   * @param {HttpError} other
   */
  constructor(other) {
    if (other) {
      Object.assign(this, other);
      other.timestamp && (this.timestamp = new Date(other.timestamp));
      this.message = (
        Array.isArray(other.message) ? [...other.message] : [other.message]
      ).filter((v) => typeof v === 'string' && v.trim().length > 0);
    }
  }
}
