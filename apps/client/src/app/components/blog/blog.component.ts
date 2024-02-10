import { Component, effect, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { isNotEmptyString } from '../auth/auth.component'
import { BlogsService } from '../../services/blogs.service'

@Component({
  standalone: true,
  selector: 'app-crm-blog',
  template: `hello blog!`
})
export class BlogComponent {
  private readonly id = signal<string | null>(null)

  public constructor(private readonly blogsService: BlogsService, private readonly route: ActivatedRoute) {
    this.id.set(this.route.snapshot.params?.['id'] ?? null)

    effect(() => {
      this.getBlog()
    })
  }

  private getBlog() {
    const id = this.id()
    if (!isNotEmptyString(id)) {
      return
    }

    this.blogsService.getBlogById(+id).subscribe(console.log)
  }
}
