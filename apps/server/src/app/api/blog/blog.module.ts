import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database/database.module'
import { BlogService } from './blog.service'
import { BlogRepository } from './blog.repository'
import { BlogController } from './blog.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
  exports: []
})
export class BlogModule {}
