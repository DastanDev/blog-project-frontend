export interface User {
  _id: string
  username: string
  token: string
}

export interface Post {
  _id: string
  title: string
  content: string
  description: string
  createdAt: string
  updatedAt: string
  author: string
}