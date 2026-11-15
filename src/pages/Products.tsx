import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PackageSearch, Search, SlidersHorizontal, X } from 'lucide-react'
import { categories, getCategory } from '../data/categories'
import { products } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import type { Product } from '../types'
import ProductCard from '../components/common/ProductCard'
import SectionHeading from '../components/common/SectionHeading'
import Button from '../components/common/Button'
import Breadcrumb from '../components/common/Breadcrumb'
import WhatsAppIcon from '../components/common/WhatsAppIcon'
import { productEnquiryMessage, whatsappLink } from '../utils/whatsapp'

type Sort = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

const sortOptions: { value: Sort; label: string }[] = [
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'price-asc', label: 'Price Low to High' },
  { value: 'price-desc', label: 'Price High to Low' },
]

function sortProducts(list: Product[], sort: Sort): Product[] {
  const byName = (a: Product, b: Product) => a.name.localeCompare(b.name)
  if (sort === 'name-asc') return [...list].sort(byName)
  if (sort === 'name-desc') return [...list].sort((a, b) => byName(b, a))
  // Price sorting only applies to products with a configured price; the rest follow A–Z.
  const priced = list.filter((p) => p.price !== undefined)
  const unpriced = list.filter((p) => p.price === undefined).sort(byName)
  priced.sort((a, b) => (sort === 'price-asc' ? a.price! - b.price! : b.price! - a.price!))
  return [...priced, ...unpriced]
}

export default function Products() {
  usePageMeta('Products', 'Browse computers, laptops, monitors, printers, networking devices, storage and accessories at CJ Solution.')
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const category = params.get('category') ?? 'all'
  const q = params.get('q') ?? ''
  const sort = (params.get('sort') as Sort) || 'name-asc'

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'all' && !(key === 'sort' && value === 'name-asc')) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    const filtered = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (!term) return true
      const catName = getCategory(p.category)?.name ?? ''
      return [p.name, p.brand, catName].some((s) => s.toLowerCase().includes(term))
    })
    return sortProducts(filtered, sort)
  }, [category, q, sort])

  const activeCategory = getCategory(category)
  const hasFilters = category !== 'all' || q !== ''
  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    products.forEach((p) => { map[p.category] = (map[p.category] ?? 0) + 1 })
    return map
  }, [])

  const filterList = (
    <ul className="space-y-1">
      {[{ slug: 'all', name: 'All Products' }, ...categories].map((c) => {
        const active = category === c.slug
        return (
          <li key={c.slug}>
            <button
              onClick={() => { update('category', c.slug); setFiltersOpen(false) }}
              aria-pressed={active}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                active ? 'bg-brand text-white' : 'text-ink hover:bg-surface'
              }`}
            >
              {c.name}
              <span className={`text-xs ${active ? 'text-white/80' : 'text-muted'}`}>{c.slug === 'all' ? products.length : counts[c.slug] ?? 0}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      <div className="bg-surface">
        <div className="container-x pb-2 pt-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Products' }]} />
          <SectionHeading
            as="h1"
            align="left"
            title={activeCategory ? activeCategory.name : 'Explore Our Products'}
            description="Discover computers, accessories and technology products for your everyday needs."
          />
        </div>
      </div>

      <div className="container-x section !pt-8">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block" aria-label="Product categories">
            <div className="card sticky top-28 p-4">
              <h2 className="mb-3 px-3 text-sm font-bold uppercase tracking-wider text-muted">Categories</h2>
              {filterList}
            </div>
          </aside>

          <div>
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <label htmlFor="product-search" className="sr-only">Search products</label>
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
                <input
                  id="product-search"
                  type="search"
                  value={q}
                  onChange={(e) => update('q', e.target.value)}
                  placeholder="Search by name, brand or category"
                  className="input pl-10"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setFiltersOpen((o) => !o)}
                  aria-expanded={filtersOpen}
                  aria-controls="mobile-filters"
                  className="flex h-[46px] items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-ink lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filters
                </button>
                <label htmlFor="sort" className="sr-only">Sort products</label>
                <select id="sort" value={sort} onChange={(e) => update('sort', e.target.value)} className="input h-[46px] flex-1 sm:w-52 sm:flex-none">
                  {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {filtersOpen && (
              <div id="mobile-filters" className="card mb-6 p-3 lg:hidden">{filterList}</div>
            )}

            <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted" aria-live="polite">
              <span>{results.length} {results.length === 1 ? 'product' : 'products'}</span>
              {category !== 'all' && activeCategory && (
                <button onClick={() => update('category', 'all')} className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  {activeCategory.name} <X className="h-3 w-3" aria-label="Clear category filter" />
                </button>
              )}
              {q && (
                <button onClick={() => update('q', '')} className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  “{q}” <X className="h-3 w-3" aria-label="Clear search" />
                </button>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 xl:grid-cols-3">
                {results.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="card flex flex-col items-center px-6 py-16 text-center">
                <PackageSearch className="h-12 w-12 text-brand/50" aria-hidden />
                <h2 className="mt-4 text-xl">{activeCategory && !q ? 'Products coming soon' : 'No products found'}</h2>
                <p className="mt-1 max-w-sm text-sm text-muted">
                  {activeCategory && !q
                    ? `We're adding ${activeCategory.name.toLowerCase()} to the website. Ask us on WhatsApp for what's currently available.`
                    : 'Try a different search or category. You can also ask us on WhatsApp.'}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Button
                    href={whatsappLink(productEnquiryMessage(activeCategory && !q ? activeCategory.name : q || 'your products'))}
                    external
                    variant="whatsapp"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
                  </Button>
                  {hasFilters && (
                    <Button variant="outline" onClick={() => setParams({}, { replace: true })}>Clear filters</Button>
                  )}
                </div>
              </div>
            )}
            <p className="mt-8 text-center text-xs text-muted">Prices are in LKR. Please contact us to confirm current availability.</p>
          </div>
        </div>
      </div>
    </>
  )
}
