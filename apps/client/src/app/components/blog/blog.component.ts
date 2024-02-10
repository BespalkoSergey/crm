import { Component, effect, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { isNotEmptyString } from '../auth/auth.component'
import { BlogsService } from '../../services/blogs.service'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { NgIf } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { translation } from '../../translation/translation.ua'

@Component({
  standalone: true,
  selector: 'app-crm-blog',
  template: `
    <div class="blog" [formGroup]="form">
      <div class="image-wrapper">
        <input #inputFile type="file" accept="image/*" (change)="onChangeInputFile($event)" />
        <p-button [label]="translation.blog.add" (click)="inputFile.click()"></p-button>
        <img
          *ngIf="form.get('imgUrl')?.value as imgUrl"
          [src]="imgUrl"
          [style.align-self]="'flex-start'"
          alt="image for blog"
          height="160"
          width="auto"
          loading="eager"
        />
      </div>
    </div>
  `,
  imports: [ReactiveFormsModule, NgIf, ButtonModule],
  styles: [
    `
      .blog {
        margin: 20px 40px 20px 0;
        border-radius: 10px;
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
      }
      .image-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .image-wrapper input[type='file'] {
        visibility: hidden;
        position: absolute;
      }
    `
  ]
})
export class BlogComponent {
  private readonly id = signal<string | null>(null)
  public readonly translation = translation
  public readonly form = new FormGroup({
    id: new FormControl<string | null>(null),
    title: new FormControl(''),
    imgUrl: new FormControl(''),
    description: new FormControl(''),
    categoryKeywords: new FormControl<string[]>([]),
    contentHtml: new FormControl(''),
    createdAt: new FormControl<Date | null>(null),
    updatedAt: new FormControl<Date | null>(null)
  })

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

    this.blogsService.getBlogById(+id).subscribe(blog => {
      if (!blog) {
        return
      }

      this.form.patchValue({
        id: blog.id.toString(),
        title: blog.title,
        imgUrl: blog.img_url,
        description: blog.description,
        categoryKeywords: blog.category_keywords,
        contentHtml: blog.content_html,
        createdAt: new Date(blog.created_at),
        updatedAt: new Date(blog.updated_at)
      })
    })
  }

  public onChangeInputFile({ target }: Event): void {
    if (target instanceof HTMLInputElement) {
      const file = target.files?.item(0)
      if (file) {
        const reader = new FileReader()

        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result
          if (result instanceof ArrayBuffer) {
            const base64String = this.arrayBufferToImageBase64(result)
            this.form.patchValue({ imgUrl: base64String })
          }
        }

        reader.readAsArrayBuffer(file)
      } else {
        this.form.patchValue({ imgUrl: '' })
      }
    }
  }

  private arrayBufferToImageBase64(buffer: ArrayBuffer): string {
    const binary = new Uint8Array(buffer)
    let base64String = ''
    for (let i = 0; i < binary.length; i++) {
      base64String += String.fromCharCode(binary[i])
    }
    return `data:image/png;base64,${btoa(base64String)}`
  }
}
