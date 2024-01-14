import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router)
  private _isLoggedIn = true
  public get isLoggedIn(): boolean {
    return this._isLoggedIn
  }

  public login(_props: { username: string; password: string }): void {
    this._isLoggedIn = true
    this.router.navigate(['/board'])
  }
}
