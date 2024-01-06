import { Injectable, Logger } from '@nestjs/common'
import { DatabaseService } from '../../database/database.service'

@Injectable()
export class BlogRepository {
  private readonly logger = new Logger(BlogRepository.name)

  public constructor(private readonly database: DatabaseService) {}
  public async getAll(): Promise<unknown[]> {
    const rows = await this.database.query('SELECT * FROM `blogs`')
    this.logger.log(rows)
    if (Array.isArray(rows)) {
      return rows as unknown[]
    }
    return []
  }
}
