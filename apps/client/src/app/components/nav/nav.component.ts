import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { translation } from '../../translation/translation.ua'

@Component({
  standalone: true,
  selector: 'app-crm-nav',
  template: `
    <nav>
      <a routerLink="/board" routerLinkActive="active">{{ translation.nav.board }}</a>
      <a routerLink="/blog" routerLinkActive="active">{{ translation.nav.blog.add }}</a>
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
        border-right: 3px solid black;
      }

      nav {
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: calc(100dvh - 40px);
      }

      .active {
        position: relative;
      }

      .active:after {
        content: '';
        display: block;
        height: 20px;
        width: 20px;
        border-radius: 100%;
        position: absolute;
        top: 0;
        left: -25px;
        background-color: rgba(255, 255, 0, 0.99);
      }
    `
  ]
})
export class NavComponent {
  public readonly translation = translation
}
