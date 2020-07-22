import { LoggingLevel, LoggerType } from '@san/shared/interfaces/logger-factory';

export abstract class LoggerPublisher {
  publishers: LoggerType[];

  abstract addPublisher(loggerType: LoggerType): void;

  abstract buildPublishers(): void;
}

export abstract class Logger {
  level: LoggingLevel;
  logWithDate: boolean;

  abstract debug(msg: any, logObject?: boolean, ...info: any[]): void;

  abstract info(msg: any, logObject?: boolean, ...info: any[]): void;

  abstract warning(msg: any, logObject?: boolean, ...info: any[]): void;

  abstract error(msg: any, logObject: boolean, ...info: any[]): void;

  abstract fatal(msg: any, logObject?: boolean, ...info: any[]): void;
}
