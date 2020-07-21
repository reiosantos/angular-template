export abstract class UrlComponent {
  abstract get(): string;

  abstract isStaging(): boolean;

  abstract isUat(): boolean;

  abstract isLocal(): boolean;

  abstract isProd(): boolean;
}
