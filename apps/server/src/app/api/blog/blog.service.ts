import { Injectable } from '@nestjs/common'
import { BlogRepository } from './blog.repository'

@Injectable()
export class BlogService {
  public constructor(private readonly blogRepository: BlogRepository) {}
  public getAll(): Promise<unknown[]> {
    return this.blogRepository.getAll()
  }
}
