import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router'
import { appRoutes } from './app.routes'
import { provideServiceWorker } from '@angular/service-worker'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation()), provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode() })]
}
