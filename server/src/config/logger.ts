import * as winston from 'winston';

const {createLogger, format} = require('winston');
const {combine, timestamp, printf} = format;

const myFormat = printf((info: any) => {
    return `${info.timestamp}  ${info.level.toUpperCase()}\t${process.pid}:\t${info.message}`;
});

export const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat,
    ),
    transports: [new winston.transports.Console()]
});