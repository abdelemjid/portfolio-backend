import morgan, { StreamOptions } from 'morgan';
import logger from '../config/logger';

const stream: StreamOptions = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const httpLogger = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);

export default httpLogger;
