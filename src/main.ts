import { ApplicationRef, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { AppModule } from '@san/app.module';
import { environment } from '@san/environment';
import { enableDebugTools } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(moduleRef => {
    if (!environment.production) {
      const applicationRef = moduleRef.injector.get(ApplicationRef);
      const [componentRef] = applicationRef.components;
      enableDebugTools(componentRef);
    }
  })
  .catch(err => console.error(err));
