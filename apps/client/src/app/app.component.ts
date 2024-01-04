import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UpdateComponent } from './components/update/update.component'

@Component({
  standalone: true,
  imports: [RouterModule, UpdateComponent],
  selector: 'app-crm-root',
  template: `
    <app-crm-update />
    <router-outlet />
  `
})
export class AppComponent {}
