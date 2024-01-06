import { BlogModeUnion } from '../models/models'

export const TEN_MINUTES = 1000 * 60 * 10 // 10 min

export const BLOG_MODE: { [Key in BlogModeUnion]: Key } = {
  add: 'add',
  edit: 'edit'
}
