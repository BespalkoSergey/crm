import { Component, signal } from '@angular/core'
import { BlogsService } from '../../services/blogs.service'
import { translation } from '../../translation/translation.ua'
import { TableModule } from 'primeng/table'
import { DatePipe, NgIf } from '@angular/common'
import { BlogType } from '@crm/shared'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  standalone: true,
  selector: 'app-crm-board',
  templateUrl: './board.component.html',
  imports: [TableModule, NgIf, DatePipe, RouterLink, RouterLinkActive],
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  public readonly blogs = signal<BlogType[]>([])
  public readonly translation = translation

  public constructor(private readonly blogsService: BlogsService) {
    this.blogsService.getAll().subscribe(list => this.blogs.set(list))
  }

  public assertAsBlog(c: unknown): BlogType {
    return c as BlogType
  }

  public deleteBlog(e: MouseEvent, id: number): void {
    e.stopPropagation()
    e.preventDefault()

    this.blogsService.deleteBlogById(id).subscribe(isDeleted => {
      if (isDeleted) {
        this.blogsService.getAll().subscribe(list => this.blogs.set(list))
      }
    })
  }
}
