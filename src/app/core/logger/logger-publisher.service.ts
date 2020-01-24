import { Injectable } from '@angular/core';
import { SanLoggerPublisher } from '@san/shared/interfaces/san-logger-publisher';
import { SanLoggerFactory, SanLoggerType } from '@san/shared/interfaces/san-logger-factory';

@Injectable()
export class LoggerPublisherService extends SanLoggerPublisher {
  publishers: SanLoggerType[] = [];

  constructor() {
    super();
    this.buildPublishers();
  }

  addPublisher = (publisher: SanLoggerType) => {
    this.publishers.push(publisher);
  };

  buildPublishers = () => {
    // add console publisher to array
    this.publishers.push(SanLoggerFactory.getLogger('console'));
  }
}
