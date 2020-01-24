import { Observable, of } from 'rxjs';

export enum LoggingLevel {
  ALL = 0,
  DEBUG = 1,
  INFO = 2,
  WARNING = 3,
  ERROR = 4,
  FATAL = 5,
  OFF = 6
}

export class LogEntry {
  date: Date;
  message: any;
  level: LoggingLevel;
  extraInfo: any[];
  logWithDate = true;

  buildLogString = (): string => {
    let ret = '';
    if (this.logWithDate) {
      ret = `${new Date()} - `;
    }
    if (typeof this.message !== 'string') {
      this.message = JSON.stringify(this.message);
    }

    ret += `Type: ${LoggingLevel[this.level]} - Message: ${this.message}`;
    if (this.extraInfo.length) {
      ret += ` - Extra Info: ${this.formatParams(this.extraInfo)}`;
    }
    return ret;
  };

  private formatParams = (params: any[]): string => {
    let ret: string = params.join(',');
    // Is there at least one object in the array?
    if (params.some(p => typeof p === 'object')) {
      ret = '';
      // Build comma-delimited string
      for (const item of params) {
        ret += `${JSON.stringify(item)},`;
      }
    }
    return ret;
  };
}

export abstract class SanLoggerType {
  private colors: any = {
    highlight: { 'background-color': 'yellow', color: 'black' },
    debug: 'green',
    info: 'blue',
    warning: { 'background-color': 'yellow', color: 'red' },
    error: { 'background-color': 'firebrick', color: 'white' },
    fatal: { 'background-color': '#cc0000', color: '#fff' },
  };

  private printObject(object: any): string {
    let str = '';
    for (const property in object) {
      if (!Object.prototype.hasOwnProperty.call(object, property)) {
        continue;
      }
      if (typeof object[property] === 'string') {
        str += `${property}: ${object[property]};`;
      } else {
        str += `${property}: {${this.printObject(object[property])}}`;
      }
    }
    return str;
  }

  getColor(level: LoggingLevel) {
    const logName: string = LoggingLevel[level].toLocaleLowerCase();
    let colorTousle: object|string = this.colors[logName] || 'black';

    if (typeof colorTousle === 'object') {
      colorTousle = this.printObject(colorTousle);
    }
    if (colorTousle) {
      colorTousle = (colorTousle.match(/\W/) ? '' : 'color:') + colorTousle;
    }
    return colorTousle;
  }

  abstract log(record: LogEntry): Observable<boolean>;

  abstract clear(): Observable<boolean>;
}

/**
 * Main Factory to use to select a logger
 */
export class SanLoggerFactory {
  static getLogger = (name: string = 'console'): SanLoggerType => {
    if (!name) throw Error('No logger specified');

    if (name.toLocaleLowerCase().includes('console')) return new LogConsole();

    throw Error('No logger matches your specification');
  };
}

/**
 * Below define loggers to be added to the the
 * list of publishers to be used
 */
class LogConsole extends SanLoggerType {
  log(entry: LogEntry): Observable<boolean> {
    console.log(`%c${entry.buildLogString()}`, this.getColor(entry.level));
    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}
