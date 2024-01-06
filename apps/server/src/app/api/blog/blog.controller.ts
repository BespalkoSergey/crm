import { Controller, Get } from '@nestjs/common'
import { BlogService } from './blog.service'

@Controller('api')
export class BlogController {
  public constructor(private readonly blogService: BlogService) {}
  @Get('blogs')
  public async getAll(): Promise<unknown[]> {
    return this.blogService.getAll()
  }
}
