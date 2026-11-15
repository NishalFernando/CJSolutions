import type { Category } from '../types'

/** Add `image: '/images/categories/xyz.jpg'` to any entry to use a real photo. */
export const categories: Category[] = [
  { slug: 'desktop-computers', name: 'Desktop Computers' },
  { slug: 'laptops', name: 'Laptops' },
  { slug: 'computer-components', name: 'Computer Components' },
  { slug: 'monitors', name: 'Monitors' },
  { slug: 'keyboards-mice', name: 'Keyboards & Mice' },
  { slug: 'printers-scanners', name: 'Printers & Scanners' },
  { slug: 'networking', name: 'Networking Devices' },
  { slug: 'storage', name: 'Storage Devices' },
  { slug: 'accessories', name: 'Computer Accessories' },
  { slug: 'cables-adapters', name: 'Cables & Adapters' },
]

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug)
