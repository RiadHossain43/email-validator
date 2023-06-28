const reset = "\x1b[0m";
const bright = "\x1b[1m";
const dim = "\x1b[2m";
const underscore = "\x1b[4m";
const blink = "\x1b[5m";
const reverse = "\x1b[7m";
const hidden = "\x1b[8m";
const black = "\x1b[30m";
const red = "\x1b[31m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const blue = "\x1b[34m";
const magenta = "\x1b[35m";
const cyan = "\x1b[36m";
const white = "\x1b[37m";

const BGblack = "\x1b[40m";
const BGred = "\x1b[41m";
const BGgreen = "\x1b[42m";
const BGyellow = "\x1b[43m";
const BGblue = "\x1b[44m";
const BGmagenta = "\x1b[45m";
const BGcyan = "\x1b[46m";
const BGwhite = "\x1b[47m";
const winston = require("winston");
const httpTransPort = new winston.transports.Http({
  host: process.env.LOGGER_CONFIG_HOST,
  port: process.env.LOGGER_CONFIG_PORT,
  ssl:
    process.env.LOGGER_CONFIG_SSL === "true" ||
    process.env.LOGGER_CONFIG_SSL === true,
  path: "/api/v1/logs",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.LOGGER_CONFIG_API_KEY,
    "x-client-id": process.env.LOGGER_CONFIG_CLIENT_ID,
  },
  format: winston.format.combine(winston.format.timestamp()),
});
const consoleTransPort = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...metaData }) => {
      const logtitle = `${magenta}${timestamp}${reset} ${level}: ${message}\n`;
      const otherkeys = Object.keys(metaData);
      const otherlogs = otherkeys.length
        ? yellow +
          "meta logs: " +
          reset +
          JSON.stringify(metaData, null, 2) +
          "\n"
        : "";
      return logtitle + otherlogs;
    })
  ),
});
const logger = winston.createLogger({
  level: "debug",
  transports: [consoleTransPort],
});
module.exports = { logger };
