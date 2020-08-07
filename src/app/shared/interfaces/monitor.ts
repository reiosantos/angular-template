import { UserType } from '@san/shared/models/user-type';

export abstract class Monitor {
  abstract monitorUser(user: UserType): void;
}
