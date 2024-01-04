import { Component, Inject, signal } from '@angular/core'
import { catchError, concatMap, delay, filter, of, Subject, switchMap, tap, timer } from 'rxjs'
import { TEN_MINUTES } from '../../constants/constants'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { InternetConnectionService } from '../../services/internet-connection.service'
import { SwUpdate } from '@angular/service-worker'
import { DOCUMENT, NgIf } from '@angular/common'
import { translation } from '../../translation/translation.ua'
import { Message, MessageService } from 'primeng/api'
import { DialogModule } from 'primeng/dialog'
import { ButtonModule } from 'primeng/button'
import { CloseBtnComponent } from '../../ui/close-btn/close-btn.component'
import { ToastModule } from 'primeng/toast'

@Component({
  selector: 'app-crm-update',
  standalone: true,
  imports: [DialogModule, ButtonModule, CloseBtnComponent, ToastModule, NgIf],
  providers: [MessageService],
  template: `
    <p-toast>
      <ng-template let-context pTemplate="message">
        <ng-container *ngIf="assertAsMessage(context) as message">
          <div [style]="{ display: 'flex', gap: '10px' }">
            <span *ngIf="message.severity === 'success'" class="pi pi-check" [style.font-size.px]="30"></span>
            <span *ngIf="message.severity === 'warn'" class="pi pi-exclamation-triangle" [style.font-size.px]="30"></span>
            <span *ngIf="message.severity === 'error'" class="pi pi-times-circle" [style.font-size.px]="30"></span>

            <div>
              <h4 [style.margin-bottom.px]="5">{{ message.summary }}</h4>
              <p [innerHTML]="message.detail"></p>
            </div>
          </div>
        </ng-container>
      </ng-template>
    </p-toast>

    <p-dialog [style]="{ width: '350px', position: 'relative' }" [visible]="visible()" [modal]="true" [closable]="false" [draggable]="false">
      <app-crm-close-btn [style]="{ top: 0, right: 0 }" (click)="update(false)" />

      <ng-template pTemplate="header">
        <h3>{{ translation.update.header }}</h3>
      </ng-template>

      <p [style.text-align]="'center'">{{ translation.update.message }}</p>

      <ng-template pTemplate="footer">
        <p class="update-btn-wrapper">
          <button type="button" pButton [label]="translation.update.btn" (click)="update(true)"></button>
        </p>
      </ng-template>
    </p-dialog>
  `,
  styles: [
    `
      .update-btn-wrapper {
        text-align: center;
        margin: 20px;
      }
    `
  ]
})
export class UpdateComponent {
  public readonly translation = translation
  public readonly visible = signal(false)
  private readonly _isPermissionedToActivateUpdate$ = new Subject<boolean>()
  public constructor(
    @Inject(DOCUMENT) private readonly _doc: Document,
    private readonly internet: InternetConnectionService,
    private readonly sw: SwUpdate,
    private readonly message: MessageService
  ) {
    this.internet.isConnected$
      .pipe(
        filter(isConnected => isConnected && this.sw.isEnabled),
        switchMap(() => timer(0, TEN_MINUTES)),
        switchMap(() => this.sw.checkForUpdate()),
        filter(hasNewVersion => hasNewVersion),
        tap(() => this.visible.set(true)),
        switchMap(() => this._isPermissionedToActivateUpdate$),
        tap(() => this.visible.set(false)),
        filter(isPermissioned => {
          if (!isPermissioned) {
            this.message.add({ severity: 'warn', summary: translation.update.warn, detail: translation.update.warnDetail, closable: false })
          }
          return isPermissioned
        }),
        switchMap(() => this.sw.activateUpdate()),
        tap(() => this.message.add({ severity: 'success', summary: translation.update.success, detail: translation.update.successDetail, closable: false })),
        catchError(() => {
          this.message.add({ severity: 'error', summary: translation.update.fail, detail: translation.update.failDetail, closable: false })
          return of(true)
        }),
        concatMap(item => of(item).pipe(delay(2000))),
        tap(() => this._doc.defaultView?.location.reload()),
        takeUntilDestroyed()
      )
      .subscribe()
  }

  public update(isPermissioned: boolean): void {
    this._isPermissionedToActivateUpdate$.next(isPermissioned)
  }

  public assertAsMessage(context: unknown): Message {
    return context as Message
  }
}
