import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { translation } from '../../translation/translation.ua'

@Component({
  standalone: true,
  selector: 'app-crm-nav',
  template: `
    <nav>
      <a routerLink="/board" routerLinkActive="active">
        <span class="pi pi-home"></span>
        {{ translation.nav.board }}
      </a>

      <a routerLink="/blog" routerLinkActive="active">
        <span class="pi pi-plus"></span>
        {{ translation.nav.blog.add }}
      </a>
    </nav>
  `,
  imports: [RouterLink, RouterLinkActive],
  styles: [
    `
      :host {
        align-self: flex-start;
        display: block;
        position: sticky;
        top: 0;
        padding: 20px 40px;
      }

      nav {
        width: 300px;
        background-color: #fff;
        border-radius: 10px;
        padding: 20px 40px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: calc(100dvh - 40px);
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
      }

      nav a {
        color: black;
        text-decoration: none;
      }

      .active {
        color: #6366f1 !important;
      }
    `
  ]
})
export class NavComponent {
  public readonly translation = translation
}
