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

  public getBlogById(id: number): Observable<BlogType | null> {
    return this.http.get<BlogType | null>(`/api/blogs/${id}`).pipe(
      catchError(e => {
        console.error(e)
        return of(null)
      })
    )
  }

  public deleteBlogById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`api/blogs/${id}`).pipe(
      catchError(e => {
        console.error(e)
        return of(false)
      })
    )
  }
}
