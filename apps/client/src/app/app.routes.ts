import { Route, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from './services/auth.service'
import { AuthComponent } from './components/auth/auth.component'
import { MainComponent } from './components/main/main.component'
import { BoardComponent } from './components/board/board.component'
import { BlogComponent } from './components/blog/blog.component'
import { Page404Component } from './components/page-404/page-404.component'

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    canActivate: [() => (!inject(AuthService).isLoggedIn ? inject(Router).navigate(['/auth']) : true)],
    children: [
      {
        path: 'board',
        component: BoardComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'blog/:id',
        component: BlogComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [() => (inject(AuthService).isLoggedIn ? inject(Router).navigate(['/board']) : true)]
  },
  {
    path: '404',
    component: Page404Component
  },
  {
    path: '**',
    redirectTo: '404'
  }
]
