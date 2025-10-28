import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '@/types/blog'

export function getBlogPosts(): BlogPost[] {
  const dir = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(dir)

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
    const { data, content } = matter(raw)

    return {
      title: data.title,
      date: new Date(data.date).toISOString(),
      slug: filename.replace(/\.md$/, ''),
      body: content,
    }
  }) 
}