import { Controller, Delete, Get, Param } from '@nestjs/common'
import { BlogService } from './blog.service'
import { BlogType } from '@crm/shared'

@Controller('api')
export class BlogController {
  public constructor(private readonly blogService: BlogService) {}
  @Get('blogs')
  public getAll(): Promise<BlogType[]> {
    return this.blogService.getAll()
  }

  @Get('blogs/:id')
  public getBlogById(@Param('id') blogId: string): Promise<BlogType | null> {
    return this.blogService.getBlogById(+blogId)
  }

  @Delete('blogs/:id')
  public deleteBlogById(@Param('id') blogId: string): Promise<boolean> {
    return this.blogService.deleteBlogById(+blogId)
  }
}
