import { Injectable } from '@nestjs/common'
import { BlogRepository } from './blog.repository'
import { BlogType } from '@crm/shared'

@Injectable()
export class BlogService {
  public constructor(private readonly blogRepository: BlogRepository) {}
  public async getAll(): Promise<BlogType[]> {
    const rows = await this.blogRepository.getAll()
    return rows.map<BlogType>(({ category_keywords, ...row }) => ({
      ...row,
      category_keywords: category_keywords.split(',').map((keyword: string) => keyword.trim())
    }))
  }

  public deleteBlogById(blogId: number): Promise<boolean> {
    return this.blogRepository.deleteBlogById(blogId)
  }

  public async getBlogById(blogId: number): Promise<BlogType | null> {
    const [row] = await this.blogRepository.getBlogById(blogId)
    return { ...row, category_keywords: row.category_keywords.split(',').map((keyword: string) => keyword.trim()) }
  }
}
