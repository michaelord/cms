import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { z } from 'zod'
import { BlogPost } from '@/types/blog'

const blogSchema = z.object({
  title: z.string(),
  date: z.string(),
  slug: z.string(),
  body: z.string(),
})

export function getBlogPosts(): BlogPost[] {
  const dir = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(dir)

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    const parsed = blogSchema.parse({ ...data, body: content })
    return parsed
  })
}
