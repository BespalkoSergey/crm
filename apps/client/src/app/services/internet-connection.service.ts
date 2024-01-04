import { Inject, Injectable } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { BehaviorSubject, fromEvent, map, merge, Observable, shareReplay, startWith, tap } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Injectable({ providedIn: 'root' })
export class InternetConnectionService {
  private readonly _isConnected$ = new BehaviorSubject(false)
  public constructor(@Inject(DOCUMENT) private readonly _doc: Document) {
    const _window = this._doc.defaultView
    if (!(_window instanceof Window)) {
      return
    }

    merge(fromEvent(_window, 'online'), fromEvent(_window, 'offline'))
      .pipe(
        map(e => e.type === 'online'),
        startWith(_window.navigator.onLine),
        takeUntilDestroyed()
      )
      .subscribe(isConnected => this._isConnected$.next(isConnected))
  }

  public get isConnected$(): Observable<boolean> {
    return this._isConnected$.asObservable().pipe(shareReplay(1))
  }
}
