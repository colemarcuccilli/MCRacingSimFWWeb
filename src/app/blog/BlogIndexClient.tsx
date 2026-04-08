'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost, BlogCategory, BLOG_CATEGORIES, getCategoryColor } from '@/lib/blog'

interface BlogIndexClientProps {
  posts: BlogPost[]
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')

  const filteredPosts = useMemo(() => {
    let result = posts

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    if (sortBy === 'oldest') {
      result = [...result].reverse()
    }

    return result
  }, [posts, selectedCategory, searchQuery, sortBy])

  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    posts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return BLOG_CATEGORIES.filter(c => counts[c]).map(c => ({
      name: c,
      count: counts[c] || 0,
    }))
  }, [posts])

  return (
    <div className="min-h-screen bg-asphalt">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="telemetry-text text-xs text-pit-gray mb-8">
            <Link href="/" className="hover:text-apex-red transition-colors">Home</Link>
            <span className="mx-2 text-apex-red">/</span>
            <span className="text-telemetry-cyan">Blog</span>
          </nav>

          <h1 className="racing-headline text-5xl md:text-6xl lg:text-7xl text-grid-white mb-4">
            The Pit Wall
          </h1>
          <p className="telemetry-text text-lg text-pit-gray max-w-2xl">
            Racing knowledge, sim tips, RC guides, and Fort Wayne community — straight from the team at MC Racing Sim.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-[60px] z-40 bg-asphalt-dark/95 backdrop-blur-md border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pit-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-asphalt border border-white/10 text-grid-white telemetry-text text-sm pl-10 pr-4 py-2.5 focus:border-telemetry-cyan focus:outline-none transition-colors"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="bg-asphalt border border-white/10 text-grid-white telemetry-text text-sm px-4 py-2.5 focus:border-telemetry-cyan focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <span className="telemetry-text text-xs text-pit-gray">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`telemetry-text text-xs px-3 py-1.5 border transition-all ${
                selectedCategory === 'all'
                  ? 'border-apex-red bg-apex-red/20 text-apex-red'
                  : 'border-white/10 text-pit-gray hover:border-white/30'
              }`}
            >
              All ({posts.length})
            </button>
            {categoriesWithCounts.map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`telemetry-text text-xs px-3 py-1.5 border transition-all ${
                  selectedCategory === name
                    ? 'border-apex-red bg-apex-red/20 text-apex-red'
                    : 'border-white/10 text-pit-gray hover:border-white/30'
                }`}
              >
                {name} ({count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="telemetry-text text-pit-gray text-lg">No articles found.</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSearchQuery('')
              }}
              className="mt-4 telemetry-text text-sm text-telemetry-cyan hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={post.slug}
                className={`card-dark group flex flex-col ${index === 0 && selectedCategory === 'all' && !searchQuery ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden aspect-video">
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-asphalt-dark/80 to-transparent"></div>
                  <span className={`absolute top-4 left-4 ${getCategoryColor(post.category)} text-white telemetry-text text-xs px-3 py-1`}>
                    {post.category}
                  </span>
                </Link>

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <time className="telemetry-text text-xs text-pit-gray">
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="telemetry-text text-xs text-pit-gray">
                      {post.readTime} min read
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="racing-headline text-xl mb-3 text-grid-white group-hover:text-apex-red transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="telemetry-text text-sm text-pit-gray flex-1 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="telemetry-text text-xs text-telemetry-cyan/70 border border-telemetry-cyan/20 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="telemetry-text text-sm text-apex-red hover:text-apex-red-glow transition-colors flex items-center gap-2"
                  >
                    Read More
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-apex-red/10 to-telemetry-cyan/10 border border-white/10 p-8 md:p-12 text-center">
          <h2 className="racing-headline text-3xl md:text-4xl text-grid-white mb-4">
            Ready to Experience It?
          </h2>
          <p className="telemetry-text text-pit-gray mb-8 max-w-xl mx-auto">
            Stop reading about racing and start doing it. Book a session on our pro-grade simulators or hit our indoor RC carpet track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-primary text-center">
              Book a Session
            </Link>
            <Link href="/location" className="btn-secondary text-center">
              Visit The Paddock
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
