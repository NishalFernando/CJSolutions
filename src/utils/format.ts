import type { Product } from '../types'

export const formatPrice = (price?: number) =>
  price === undefined ? 'Contact for Price' : `LKR ${price.toLocaleString('en-US')}`

export const availabilityLabel: Record<NonNullable<Product['availability']>, string> = {
  'in-stock': 'In Stock',
  limited: 'Limited Stock',
  'out-of-stock': 'Out of Stock',
}
