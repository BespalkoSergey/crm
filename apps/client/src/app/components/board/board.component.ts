import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { BlogsService } from '../../services/blogs.service'
import { translation } from '../../translation/translation.ua'
import { TableModule } from 'primeng/table'
import { DatePipe, NgIf } from '@angular/common'
import { BlogType } from '@crm/shared'

@Component({
  standalone: true,
  selector: 'app-crm-board',
  templateUrl: './board.component.html',
  imports: [TableModule, NgIf, DatePipe],
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  private readonly blogsService = inject(BlogsService)
  public readonly blogs = toSignal(this.blogsService.getAll(), { initialValue: [] })
  public readonly translation = translation

  public assertAsBlog(c: unknown): BlogType {
    return c as BlogType
  }
}
