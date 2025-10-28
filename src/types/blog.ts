export interface BlogPost {
  id: string
  title: string
  date: string
  slug: string
  body: string
  author?: Author
}


export interface Author {
  id: string
  name: string
  bio: string
  avatar: string
}
