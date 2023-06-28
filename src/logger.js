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
    winston.format.prettyPrint(),
    winston.format.simple()
  ),
});
const logger = winston.createLogger({
  level: "debug",
  transports: [consoleTransPort],
});
module.exports = { logger };
