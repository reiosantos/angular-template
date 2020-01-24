import { SanUser } from '@san/shared/models/san-user';

export abstract class SanMonitor {
  abstract monitorUser(user: SanUser): void;
}
