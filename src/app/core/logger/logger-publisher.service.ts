import { Injectable } from '@angular/core';
import { LoggerPublisher } from '@san/shared/interfaces/logger-publisher';
import { LoggerFactory, LoggerType } from '@san/shared/interfaces/logger-factory';

@Injectable()
export class LoggerPublisherService extends LoggerPublisher {
  publishers: LoggerType[] = [];

  constructor() {
    super();
    this.buildPublishers();
  }

  addPublisher = (publisher: LoggerType) => {
    this.publishers.push(publisher);
  };

  buildPublishers = () => {
    // add console publisher to array
    this.publishers.push(LoggerFactory.getLogger('console'));
  };
}
