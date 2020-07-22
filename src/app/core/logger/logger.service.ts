import { Injectable } from '@angular/core';
import { LogEntry, LoggingLevel, LoggerType } from '@san/shared/interfaces/logger-factory';
import { Logger, LoggerPublisher } from '@san/shared/interfaces/logger-publisher';

@Injectable()
export class LoggerService extends Logger {
  level: LoggingLevel = LoggingLevel.ALL;
  logWithDate = true;

  constructor(private loggerPublisher: LoggerPublisher) {
    super();
  }

  debug = (msg: any, logObject = true, ...info: any[]) => {
    this.writeToLog(msg, LoggingLevel.DEBUG, logObject, info);
  };

  info = (msg: any, logObject = true, ...info: any[]) => {
    this.writeToLog(msg, LoggingLevel.INFO, logObject, info);
  };

  warning = (msg: any, logObject = true, ...info: any[]) => {
    this.writeToLog(msg, LoggingLevel.WARNING, logObject, info);
  };

  error = (msg: any, logObject = true, ...info: any[]) => {
    this.writeToLog(msg, LoggingLevel.ERROR, logObject, info);
  };

  fatal = (msg: any, logObject = true, ...info: any[]) => {
    this.writeToLog(msg, LoggingLevel.FATAL, logObject, info);
  };

  private shouldLog(level: LoggingLevel): boolean {
    let ret = false;
    if ((level >= this.level && level !== LoggingLevel.OFF) || this.level === LoggingLevel.ALL) {
      ret = true;
    }
    return ret;
  }

  private writeToLog(msg: any, level: LoggingLevel, logObject: boolean, params: any[]) {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();
      entry.logObject = logObject;
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      this.loggerPublisher.publishers.forEach((logger: LoggerType) => {
        logger.log(entry).subscribe(() => {});
      });
    }
  }
}
