import { Metadata } from 'next'
import { Suspense } from 'react'
import PostersClient from './PostersClient'

export const metadata: Metadata = {
  title: 'Printable Posters',
  robots: { index: false, follow: false },
}

export default function PostersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#E8E8E8]" />}>
      <PostersClient />
    </Suspense>
  )
}
