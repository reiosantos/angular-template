import { LoggingLevel, SanLoggerType } from '@san/shared/interfaces/san-logger-factory';

export abstract class SanLoggerPublisher {
  publishers: SanLoggerType[];

  abstract addPublisher(loggerType: SanLoggerType): void;

  abstract buildPublishers(): void;
}

export abstract class SanLogger {
  level: LoggingLevel;
  logWithDate: boolean;

  abstract debug(msg: any, ...info: any[]): void;

  abstract info(msg: any, ...info: any[]): void;

  abstract warning(msg: any, ...info: any[]): void;

  abstract error(msg: any, ...info: any[]): void;

  abstract fatal(msg: any, ...info: any[]): void;
}
