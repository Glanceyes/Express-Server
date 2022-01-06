import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const { combine, timestamp, printf } = winston.format;

const logDir = "logs";
const logFormat = printf((info) => {
    return `[ ${info.level} ] | [ ${info.timestamp} ]: ${info.message}`;
});

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        logFormat
    ),
    transports: [
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + `/info`,
            filename: `%DATE%.log`,
            maxFiles: 10,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + `/error`,
            filename: `%DATE%.error.log`,
            maxFiles: 10,
            zippedArchive: true,
        }),
    ],
});

if (process.env.NODE_ENV !== "production"){
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple()
            ),
        })
    );
}
