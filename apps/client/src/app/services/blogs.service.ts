import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, of } from 'rxjs'
import { BlogType } from '@crm/shared'

@Injectable({ providedIn: 'root' })
export class BlogsService {
  private readonly http = inject(HttpClient)
  public getAll(): Observable<BlogType[]> {
    return this.http.get<BlogType[]>('/api/blogs').pipe(
      catchError(e => {
        console.error(e)
        return of([])
      })
    )
  }
}
