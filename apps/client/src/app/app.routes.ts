import { Route, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from './services/auth.service'
import { AuthComponent } from './components/auth/auth.component'
import { MainComponent } from './components/main/main.component'

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
    canActivate: [() => (!inject(AuthService).isLoggedIn ? inject(Router).navigate(['/auth']) : true)]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [() => (inject(AuthService).isLoggedIn ? inject(Router).navigate(['/']) : true)]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
]
