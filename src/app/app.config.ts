 import { ApplicationConfig, isDevMode } from '@angular/core';
 import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router'
 import { provideHttpClient, withFetch } from '@angular/common/http'
 import { provideAnimations } from '@angular/platform-browser/animations';

 import { routes } from './app.routes'
 import { provideClientHydration } from '@angular/platform-browser';
 import { provideStore } from '@ngrx/store';
 import { environment } from '../environments/environment'

 export const appConfig: ApplicationConfig = {
     providers: [
         provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules)),
         provideClientHydration(),
         provideHttpClient(withFetch()),
         provideAnimations(),
         provideStore(),
         environment.providers,
]
 }
