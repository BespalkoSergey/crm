import { Component, effect, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { isNotEmptyString } from '../auth/auth.component'
import { BlogsService } from '../../services/blogs.service'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { NgForOf, NgIf } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { translation } from '../../translation/translation.ua'
import { CloseBtnComponent } from '../../ui/close-btn/close-btn.component'
import { InputTextModule } from 'primeng/inputtext'

function arrayBufferToImageBase64(buffer: ArrayBuffer, type: string): string {
  const binary = new Uint8Array(buffer)
  let base64String = ''
  for (let i = 0; i < binary.length; i++) {
    base64String += String.fromCharCode(binary[i])
  }
  return `data:${type};base64,${btoa(base64String)}`
}

@Component({
  standalone: true,
  selector: 'app-crm-blog',
  template: `
    <div class="blog" [formGroup]="form">
      <div class="input-wrapper">
        <input #inputFile type="file" accept="image/*" (change)="onChangeInputFile($event)" />
        <p-button [label]="translation.blog.addImg" (click)="inputFile.click()"></p-button>

        <div *ngIf="form.get('imgUrl')?.value as imgUrl" class="image-wrapper">
          <app-crm-close-btn [style.right.px]="-10" [style.top.px]="-10" (click)="clearFromImage()"></app-crm-close-btn>
          <img [src]="imgUrl" alt="image for blog" height="160" width="auto" loading="eager" />
        </div>
      </div>

      <div class="text-wrapper">
        <label for="title">{{ translation.blog.title }}</label>
        <input pInputText id="title" formControlName="title" [style.width.px]="600" />
      </div>

      <div class="text-wrapper">
        <label for="description">{{ translation.blog.description }}</label>
        <input pInputText id="description" formControlName="description" [style.width.px]="600" />
      </div>

      <div class="tag-wrapper">
        <div class="tag-input">
          <input pInputText id="title" [formControl]="tagControl" [style.width.px]="300" />
          <p-button [label]="translation.blog.addTag" (click)="addTag()"></p-button>
        </div>

        <p *ngIf="form.get('categoryKeywords')?.value as list" class="tags">
          <span *ngFor="let tag of list; let index = index; trackBy: trackByTag" class="tag">
            <app-crm-close-btn [style.right.px]="-9" [style.top.px]="-9" (click)="deleteTag(index)"></app-crm-close-btn>
            <span>{{ tag }}</span>
          </span>
        </p>
      </div>
    </div>
  `,
  imports: [ReactiveFormsModule, NgIf, ButtonModule, CloseBtnComponent, InputTextModule, NgForOf],
  styles: [
    `
      .blog {
        margin: 20px 40px 20px 0;
        border-radius: 10px;
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
      }

      .input-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .input-wrapper input[type='file'] {
        visibility: hidden;
        position: absolute;
      }

      .image-wrapper {
        align-self: flex-start;
        position: relative;
      }

      .text-wrapper {
        display: flex;
        flex-direction: column;
      }

      label {
        font-size: 14px;
        padding: 20px 0 10px 10px;
      }

      .tag-wrapper {
        margin-top: 20px;
      }

      .tag-input {
        display: flex;
        gap: 20px;
      }

      .tags {
        margin-top: 20px;
        display: flex;
        gap: 10px;
      }

      .tag {
        position: relative;
        white-space: nowrap;
        background-color: rgb(238, 238, 238);
        padding: 3px 10px;
        border-radius: 10px;
      }
    `
  ]
})
export class BlogComponent {
  private readonly id = signal<string | null>(null)
  public readonly translation = translation
  public readonly tagControl = new FormControl('')
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
            const base64String = arrayBufferToImageBase64(result, file.type)
            this.form.patchValue({ imgUrl: base64String })
          }
        }

        reader.readAsArrayBuffer(file)
      }
    }
  }

  public clearFromImage(): void {
    this.form.patchValue({ imgUrl: '' })
  }

  public deleteTag(index: number): void {
    const control = this.form.get('categoryKeywords') as FormControl<string[]>
    if (!Array.isArray(control.value)) {
      return
    }

    control.setValue(control.value.filter((_, i) => i !== index))
  }

  public addTag(): void {
    const control = this.form.get('categoryKeywords') as FormControl<string[]>
    if (!Array.isArray(control.value)) {
      return
    }

    const tag = this.tagControl.value
    if (!isNotEmptyString(tag)) {
      return
    }

    control.setValue([...control.value, tag])
    this.tagControl.setValue('')
  }

  public trackByTag(_: number, tag: string): string {
    return tag
  }
}
