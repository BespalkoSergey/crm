import { Injectable } from '@nestjs/common'
import { BlogRepository } from './blog.repository'
import { BlogType } from '@crm/shared'

@Injectable()
export class BlogService {
  public constructor(private readonly blogRepository: BlogRepository) {}
  public async getAll(): Promise<BlogType[]> {
    const rows = await this.blogRepository.getAll()
    const blogs = rows.map<BlogType>(({ category_keywords, ...row }) => ({
      ...row,
      category_keywords: category_keywords.split(',').map((keyword: string) => keyword.trim())
    }))
    return [...blogs].sort((a, b) => (new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()) * -1)
  }

  public async deleteBlogById(blogId: number): Promise<boolean> {
    return this.blogRepository.deleteBlogById(blogId)
  }
}
