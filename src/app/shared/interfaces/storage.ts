export abstract class Storage {
  abstract get(key: string): string | null;

  abstract set(key: string, value: string): void;

  abstract delete(key: string): void;

  abstract clear(): void;
}
