/**
 * @fileoverview Provides a simple logging utility with timestamped output for console logging.
 * Supports standard logs and error logs with consistent formatting.
 */
export const Logger = {
    /**
     * Logs a message to the console with a timestamp.
     *
     * @param {string} message - The main message to log.
     * @param {...*} args - Optional additional arguments to include in the log.
     */
    log(message, ...args) {
        console.log(`[${new Date().toISOString()}] ${message}`, ...args);
    },
    /**
     * Logs an error message to the console with a timestamp.
     *
     * @param {string} message - The error message to log.
     * @param {...*} args - Optional additional arguments to include in the error output.
     */
    error(message, ...args) {
        console.error(`[${new Date().toISOString()}] ${message}`, ...args);
    }
};