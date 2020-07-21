import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService as StSvc } from 'ngx-webstorage-service';
import { Storage } from '@san/shared/interfaces/storage';

@Injectable()
export class StorageService extends Storage {
  constructor(@Inject(LOCAL_STORAGE) private localStorage: StSvc) {
    super();
  }
  get = (key: string): string | null => {
    const d = this.localStorage.get(key);
    try {
      return JSON.parse(d);
    } catch (e) {
      return d;
    }
  };
  set = (key: string, value: string): void => {
    this.localStorage.set(key, value);
  };
  delete(key: string): void {
    this.localStorage.remove(key);
  }
  clear(): void {
    this.localStorage.clear();
  }
}
