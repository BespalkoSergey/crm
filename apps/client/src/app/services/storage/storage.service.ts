import { inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { AbstractStorage } from './abstract-storage'
import { StorageFallback } from './storage-fallback'

export class StorageService extends AbstractStorage {
  protected readonly _doc = inject(DOCUMENT)
  protected _storage: Storage
  constructor() {
    super()

    this._storage = new StorageFallback()
  }
  public get length(): number {
    return this._storage.length
  }

  public getItem(key: string): string | null {
    return this._storage.getItem(key)
  }

  public setItem(key: string, value: string): void {
    this._storage.setItem(key, value)
  }

  public clear(): void {
    this._storage.clear()
  }

  public key(index: number): string | null {
    return this._storage.key(index)
  }

  public removeItem(key: string): void {
    this._storage.removeItem(key)
  }
}
