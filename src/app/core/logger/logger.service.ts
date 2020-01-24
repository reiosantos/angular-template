import { Injectable } from '@angular/core';
import { LogEntry, LoggingLevel, SanLoggerType } from '@san/shared/interfaces/san-logger-factory';
import { SanLogger, SanLoggerPublisher } from '@san/shared/interfaces/san-logger-publisher';

@Injectable()
export class LoggerService extends SanLogger {
  level: LoggingLevel = LoggingLevel.ALL;
  logWithDate = true;

  constructor(private sanLoggerPublisher: SanLoggerPublisher) {
    super();
  }

  debug = (msg: any, ...info: any[]) => {
    this.writeToLog(msg, LoggingLevel.DEBUG, info);
  };

  info = (msg: any, ...info: any[]) => {
    this.writeToLog(msg, LoggingLevel.INFO, info);
  };

  warning = (msg: any, ...info: any[]) => {
    this.writeToLog(msg, LoggingLevel.WARNING, info);
  };

  error = (msg: any, ...info: any[]) => {
    this.writeToLog(msg, LoggingLevel.ERROR, info);
  };

  fatal = (msg: any, ...info: any[]) => {
    this.writeToLog(msg, LoggingLevel.FATAL, info);
  };

  private shouldLog(level: LoggingLevel): boolean {
    let ret = false;
    if ((level >= this.level && level !== LoggingLevel.OFF) ||
      this.level === LoggingLevel.ALL) {
      ret = true;
    }
    return ret;
  }

  private writeToLog(msg: any, level: LoggingLevel, params: any[]) {
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      this.sanLoggerPublisher.publishers.forEach((logger: SanLoggerType) => {
        logger.log(entry).subscribe(() => {
        });
      });
    }
  }
}
