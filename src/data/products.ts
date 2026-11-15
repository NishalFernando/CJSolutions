import type { Product } from '../types'
import data from './products.data.json'
import { asset } from '../utils/asset'

/**
 * Real product catalogue, generated from products.xlsx by
 * `python scripts/import_products.py`. Product photos live in public/images/products/.
 */
export const products = (data as Product[]).map((p) => (p.image ? { ...p, image: asset(p.image) } : p))

export const getProduct = (id?: string) => products.find((p) => p.id === id)
