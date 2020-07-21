export abstract class Alert {
  options: Record<string, unknown> = {
    positionClass: 'toast-top-center',
    preventDuplicates: true
  };

  abstract success(msg: string, title?: string): void;

  abstract info(msg: string, title?: string): void;

  abstract warning(msg: string, title?: string): void;

  abstract error(msg: string, title?: string): void;

  abstract clear(): void;
}
