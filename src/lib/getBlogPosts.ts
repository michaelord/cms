import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Author, BlogPost } from '@/types/blog'


export function getAuthors(): Author[] {
  const dir = path.join(process.cwd(), 'content/authors')
  const files = fs.readdirSync(dir)

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
    const { data, content } = matter(raw)

    return {
      id: data.id,
      name: data.name,
      bio: content,
      avatar: data.avatar,      
    }
  }) 
}


export function getBlogPosts(): BlogPost[] {
  const dir = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(dir)

  const authors = getAuthors()

  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
    const { data, content } = matter(raw)

    return {
      id: data.id,
      title: data.title,
      date: new Date(data.date).toISOString(),
      slug: filename.replace(/\.md$/, ''),
      body: content,
      author: authors.find((author) => author.id === data.author),
    }
  }) 
}