import { Component } from '@angular/core'
import { NgStyle } from '@angular/common'

@Component({
  selector: 'app-crm-close-btn',
  standalone: true,
  imports: [NgStyle],
  template: '<span class="pi pi-times close-btn-icon"></span>',
  styles: [
    `
      :host {
        display: block;
        position: absolute;
        cursor: pointer;
      }

      .close-btn-icon {
        padding: 5px;
        border-radius: 100%;
        font-size: 11px;
      }

      .close-btn-icon:hover {
        background-color: rgba(52, 58, 64, 0.3);
      }
    `
  ]
})
export class CloseBtnComponent {}
