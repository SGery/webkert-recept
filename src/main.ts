import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Enable production mode if environment.production is true
if (environment.production) {
  enableProdMode();
}

// Bootstrap the Angular application with AppModule
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));