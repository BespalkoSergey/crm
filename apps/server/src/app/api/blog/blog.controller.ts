import { Controller, Delete, Get, Param } from '@nestjs/common'
import { BlogService } from './blog.service'
import { BlogType } from '@crm/shared'

@Controller('api')
export class BlogController {
  public constructor(private readonly blogService: BlogService) {}
  @Get('blogs')
  public async getAll(): Promise<BlogType[]> {
    return this.blogService.getAll()
  }

  @Delete('blogs/:id')
  async deleteBlogById(@Param('id') blogId: string): Promise<boolean> {
    return await this.blogService.deleteBlogById(+blogId)
  }
}
