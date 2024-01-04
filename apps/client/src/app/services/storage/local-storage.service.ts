import { Injectable } from '@angular/core'
import { StorageFallback } from './storage-fallback'
import { StorageService } from './storage.service'

@Injectable({ providedIn: 'root' })
export class LocalStorageService extends StorageService {
  constructor() {
    super()

    this._storage = this._doc.defaultView?.localStorage ?? new StorageFallback()
  }
}
