const { createLogger, format, transports } = require('winston');
const {join} = require("path");

const projectRoot = process.cwd();
const logFilePath = join(projectRoot, 'logs', 'error.log');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.simple()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: logFilePath, level: 'error' }),
    ],
});

const sendError = (res, message, statusCode = 400) => {
    logger.error(`${statusCode} - ${message}`);

    return res.status(statusCode).json({ message });
};

module.exports = {
    sendError
}
