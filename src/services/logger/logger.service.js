const LOGGER_MAP = {
  error: (...args) => console.error(...args),
  warn: (...args) => console.warn(...args),
  info: (...args) => console.info(...args),
  verbose: (...args) => console.log(...args),
  debug: (...args) => console.debug(...args),
};

class Logger {
  /**
   * @param {keyof LOGGER_MAP} level - The log level to use.
   * @param {...any} args - The messages to log.
   */
  _log = (level, ...args) => {
    LOGGER_MAP[level] ? LOGGER_MAP[level](...args) : console.log(...args);
  };

  error = (...args) => this._log('error', ...args);
  warn = (...args) => this._log('warn', ...args);
  info = (...args) => this._log('info', ...args);
  verbose = (...args) => this._log('verbose', ...args);
  debug = (...args) => this._log('debug', ...args);
}

export const logger = new Logger();
