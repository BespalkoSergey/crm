import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../../database/database.service'

type RowType = {
  id: number
  title: string
  img_url: string
  description: string
  category_keywords: string
  content_html: string
  created_at: string
  updated_at: string
}

@Injectable()
export class BlogRepository {
  public constructor(private readonly database: DatabaseService) {}
  public async getAll(): Promise<RowType[]> {
    return await this.database.query<RowType>('SELECT * FROM `blogs` ORDER BY `blogs`.`updated_at` DESC')
  }

  public async deleteBlogById(blogId: number): Promise<boolean> {
    try {
      await this.database.query('DELETE FROM `blogs` WHERE id = ?', [blogId])
      return true
    } catch (_) {
      return false
    }
  }
}
