import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import BlogPostClient from './BlogPostClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const url = `https://mcracingfortwayne.com/blog/${post.slug}`

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate,
      authors: [post.author.name],
      images: [
        {
          url: `https://mcracingfortwayne.com${post.featuredImage}`,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [`https://mcracingfortwayne.com${post.featuredImage}`],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category, 3)

  // Get prev/next by chronological order
  const allPosts = await getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <BlogPostClient
      post={post}
      relatedPosts={relatedPosts}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  )
}
