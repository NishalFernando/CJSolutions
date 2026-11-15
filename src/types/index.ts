export type CategorySlug =
  | 'desktop-computers'
  | 'laptops'
  | 'computer-components'
  | 'monitors'
  | 'keyboards-mice'
  | 'printers-scanners'
  | 'networking'
  | 'storage'
  | 'accessories'
  | 'cables-adapters'

export interface Category {
  slug: CategorySlug
  name: string
  /** Optional photo path. Falls back to the built-in illustration. */
  image?: string
}

export interface SpecItem {
  /** Omit for free-text rows (e.g. a port list entry). */
  label?: string
  value: string
}

export interface SpecGroup {
  title?: string | null
  items: SpecItem[]
}

export interface Product {
  id: string
  name: string
  brand: string
  category: CategorySlug
  /** One-line summary for cards. */
  shortDescription: string
  description?: string
  /** Key feature bullet points. */
  highlights: string[]
  specGroups: SpecGroup[]
  warranty?: string
  /** LKR. Leave undefined to display "Contact for Price". */
  price?: number
  availability?: 'in-stock' | 'limited' | 'out-of-stock'
  image?: string
  featured?: boolean
}

export type ServiceIcon =
  | 'monitor'
  | 'laptop'
  | 'printer'
  | 'cpu'
  | 'download'
  | 'headset'
  | 'wifi'

export type EnquiryType =
  | 'Product Inquiry'
  | 'PC Repair'
  | 'Laptop Repair'
  | 'Printer Repair'
  | 'General IT Support'
  | 'Other'

export interface Service {
  slug: string
  title: string
  icon: ServiceIcon
  shortDescription: string
  description: string
  commonIssues: string[]
  enquiryType: EnquiryType
  /** Shown in the six-card section on the Home page. */
  homeFeatured?: boolean
}

export interface Testimonial {
  id: string
  name: string
  rating: number
  review: string
}
