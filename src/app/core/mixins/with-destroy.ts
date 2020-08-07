import { Constructor } from '@san/core/mixins/index';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

// tslint:disable-next-line:variable-name
export function withDestroy<T extends Constructor<{}>>(Base: T = class {} as any) {
  return class extends Base implements OnDestroy {
    destroy$: Subject<void> = new Subject<void>();

    constructor(...args: any[]) {
      super(...args);
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  };
}
