export abstract class Storage {
  abstract get(key: string): string | null | any;

  abstract set(key: string, value: string): void;

  abstract delete(key: string): void;

  abstract clear(): void;
}
