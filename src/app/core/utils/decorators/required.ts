function required(target: object, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    get(): any {
      throw new Error(`Attribute ${propertyKey} is required`);
    },
    set(v: any): void {
      Object.defineProperty(target, propertyKey, {
        value: v,
        writable: true,
        configurable: true
      });
    }
  });
}

export { required as Required };
