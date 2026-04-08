// Blog types and data access layer

export type BlogCategory =
  | 'Sim Racing Hardware'
  | 'Sim Racing Software'
  | 'Racing Technique'
  | 'Sim-to-Real'
  | 'Racing Physics'
  | 'How Cars Work'
  | 'Racing Careers'
  | 'Motorsport History'
  | 'RC Cars'
  | 'Entertainment Business'
  | 'STEM Education'
  | 'Fort Wayne'

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Sim Racing Hardware',
  'Sim Racing Software',
  'Racing Technique',
  'Sim-to-Real',
  'Racing Physics',
  'How Cars Work',
  'Racing Careers',
  'Motorsport History',
  'RC Cars',
  'Entertainment Business',
  'STEM Education',
  'Fort Wayne',
]

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  category: BlogCategory
  tags: string[]
  author: { name: string; role: string }
  publishDate: string
  modifiedDate: string
  readTime: number
  featuredImage: string
  featuredImageAlt: string
  content: string
}

// Dynamic imports for code splitting
export async function getAllPosts(): Promise<BlogPost[]> {
  const [batch1, batch2, batch3] = await Promise.all([
    import('@/content/blog/posts-batch-1').then(m => m.posts),
    import('@/content/blog/posts-batch-2').then(m => m.posts),
    import('@/content/blog/posts-batch-3').then(m => m.posts),
  ])
  const all = [...batch1, ...batch2, ...batch3]
  return all.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts()
  return posts.find(p => p.slug === slug)
}

export async function getPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(p => p.category === category)
}

export async function getRelatedPosts(currentSlug: string, category: BlogCategory, limit = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts
    .filter(p => p.slug !== currentSlug)
    .filter(p => p.category === category)
    .slice(0, limit)
}

export function getCategoryColor(category: BlogCategory): string {
  const colors: Record<BlogCategory, string> = {
    'Sim Racing Hardware': 'bg-red-600',
    'Sim Racing Software': 'bg-blue-600',
    'Racing Technique': 'bg-green-600',
    'Sim-to-Real': 'bg-purple-600',
    'Racing Physics': 'bg-cyan-600',
    'How Cars Work': 'bg-orange-600',
    'Racing Careers': 'bg-yellow-600',
    'Motorsport History': 'bg-pink-600',
    'RC Cars': 'bg-lime-600',
    'Entertainment Business': 'bg-indigo-600',
    'STEM Education': 'bg-teal-600',
    'Fort Wayne': 'bg-amber-600',
  }
  return colors[category] || 'bg-gray-600'
}

export function getCategorySlug(category: BlogCategory): string {
  return category.toLowerCase().replace(/\s+/g, '-')
}
