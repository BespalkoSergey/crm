import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NavComponent } from '../nav/nav.component'

@Component({
  standalone: true,
  selector: 'app-crm-main',
  imports: [RouterOutlet, NavComponent],
  template: `
    <div class="wrapper">
      <app-crm-nav />
      <router-outlet />
    </div>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
      }
    `
  ]
})
export class MainComponent {}
