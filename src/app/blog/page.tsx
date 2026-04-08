import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogIndexClient from './BlogIndexClient'

export const metadata: Metadata = {
  title: 'Blog — The Pit Wall',
  description: 'Racing knowledge, sim tips, RC guides, and Fort Wayne community stories from MC Racing Sim. Learn about sim racing hardware, technique, motorsport history, and more.',
  openGraph: {
    title: 'The Pit Wall — MC Racing Sim Blog',
    description: 'Racing knowledge, sim tips, RC guides, and Fort Wayne community stories from MC Racing Sim.',
    url: 'https://mcracingfortwayne.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pit Wall — MC Racing Sim Blog',
    description: 'Racing knowledge, sim tips, RC guides, and Fort Wayne community stories.',
  },
  alternates: {
    canonical: 'https://mcracingfortwayne.com/blog',
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <BlogIndexClient posts={posts} />
}
