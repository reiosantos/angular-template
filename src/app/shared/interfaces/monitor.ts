import { User } from '@san/shared/models/user';

export abstract class Monitor {
  abstract monitorUser(user: User): void;
}
