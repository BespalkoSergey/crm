import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter, withEnabledBlockingInitialNavigation, withViewTransitions } from '@angular/router'
import { appRoutes } from './app.routes'
import { provideServiceWorker } from '@angular/service-worker'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withViewTransitions()),
    provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode() }),
    provideHttpClient()
  ]
}
