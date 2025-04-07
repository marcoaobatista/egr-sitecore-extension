// logger.js
export const Logger = {
    log(message, ...args) {
        console.log(`[${new Date().toISOString()}] ${message}`, ...args);
    },
    error(message, ...args) {
        console.error(`[${new Date().toISOString()}] ${message}`, ...args);
    }
};