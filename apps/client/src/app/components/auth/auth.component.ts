import { Component, inject } from '@angular/core'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { translation } from '../../translation/translation.ua'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'
import { AuthService } from '../../services/auth.service'
import { NgOptimizedImage } from '@angular/common'
// import { isNotEmptyString } from '@crm/shared'

export const isNotEmptyString = (context: unknown): context is string => typeof context === 'string' && !!context.trim()

@Component({
  selector: 'app-crm-auth',
  standalone: true,
  imports: [CardModule, ButtonModule, ReactiveFormsModule, InputTextModule, PasswordModule, NgOptimizedImage],
  template: `
    <p-card class="auth-wrapper">
      <div class="auth-logo">
        <img ngSrc="assets/icons/favicon.svg" alt="icon" height="100%" width="auto" loading="eager" />
        <h2>CRM</h2>
      </div>

      <input pInputText id="username" name="username" type="email" class="auth-username" [placeholder]="translation.auth.email" [formControl]="username" />

      <p-password
        [inputStyle]="{ width: '100%' }"
        [style]="{ width: '100%', 'margin-top': '10px' }"
        [placeholder]="translation.auth.pass"
        [formControl]="password"
        [feedback]="false"
        [toggleMask]="true"
      ></p-password>

      <ng-template pTemplate="footer">
        <p-button [style]="{ width: '100%', height: '50px' }" (click)="submit($event)">
          <h4 class="auth-btn-content">
            <span>{{ translation.auth.login }}</span>
            <span class="pi pi-sign-in"></span>
          </h4>
        </p-button>
      </ng-template>
    </p-card>
  `,
  styles: [
    `
      .auth-wrapper {
        display: block;
        width: 360px;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: 50%;
        transform: translate(0, -50%);
      }
      .auth-username {
        margin-top: 30px;
        width: 100%;
      }
      .auth-logo {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
      .auth-btn-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
    `
  ]
})
export class AuthComponent {
  private readonly auth = inject(AuthService)
  public readonly translation = translation
  public readonly form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  public submit(event: MouseEvent): void {
    event.stopPropagation()
    event.preventDefault()

    this.username.markAsDirty()
    this.password.markAsDirty()

    const { username, password } = this.form.value

    if (!isNotEmptyString(username) || !isNotEmptyString(password)) {
      return
    }

    this.auth.login({ username, password })
  }

  public get username(): FormControl {
    return this.form.get('username') as FormControl
  }

  public get password(): FormControl {
    return this.form.get('password') as FormControl
  }
}
