import {createLogger, format, transports} from 'winston';

const logger = createLogger({
  level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
  transports: [
    new winston.transports.Console(),
  ]
});

export default logger;