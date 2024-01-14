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
    const rows = await this.database.query('SELECT * FROM `blogs` ORDER BY `blogs`.`updated_at` DESC')
    if (Array.isArray(rows)) {
      return rows as RowType[]
    }
    return []
  }
}
