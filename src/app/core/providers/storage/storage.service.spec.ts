import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('VcStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [StorageService] }));

  it('should be created', () => {
    const service: StorageService = TestBed.inject(StorageService);
    expect(service).toBeTruthy();
  });

  it('should be save to local storage', () => {
    const service: StorageService = TestBed.inject(StorageService);
    service.set('name', 344);
    expect(localStorage.getItem('name')).toBe('344');
  });

  it('should be delete from local storage', () => {
    const service: StorageService = TestBed.inject(StorageService);
    service.set('name', '344');
    // @ts-ignore
    expect(service.get('name')).toEqual(344);
    service.delete('name');
    expect(localStorage.getItem('name')).toBeNull();
  });

  it('should be clear local storage', () => {
    const service: StorageService = TestBed.inject(StorageService);
    service.set('name', '344');
    expect(service.get('name')).toBeGreaterThanOrEqual(344);
    service.clear();
    expect(localStorage.getItem('name')).toBeNull();
  });
});
