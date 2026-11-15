import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react'
import { getProduct, products } from '../data/products'
import { getCategory } from '../data/categories'
import { availabilityLabel, formatPrice } from '../utils/format'
import { productEnquiryMessage, whatsappLink } from '../utils/whatsapp'
import { usePageMeta } from '../hooks/usePageMeta'
import Breadcrumb from '../components/common/Breadcrumb'
import Button from '../components/common/Button'
import ProductImage from '../components/common/ProductImage'
import ProductCard from '../components/common/ProductCard'
import WhatsAppIcon from '../components/common/WhatsAppIcon'
import SpecTable from '../components/product/SpecTable'
import NotFound from './NotFound'

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProduct(id)
  usePageMeta(product?.name ?? 'Product not found', product?.shortDescription || 'Product details.')

  if (!product) return <NotFound message="We couldn't find that product." />

  const category = getCategory(product.category)
  const others = products.filter((p) => p.id !== product.id)
  const related = [...others.filter((p) => p.category === product.category), ...others.filter((p) => p.category !== product.category)].slice(0, 4)

  return (
    <div className="container-x py-8 sm:py-12">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: product.name }]} />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="card self-start overflow-hidden lg:sticky lg:top-28">
          <ProductImage src={product.image} alt={product.name} category={product.category} eager className="!aspect-square" />
        </div>

        <div className="min-w-0">
          <Link to={`/products?category=${product.category}`} className="text-xs font-bold uppercase tracking-wider text-brand hover:underline">
            {category?.name}
          </Link>
          <h1 className="mt-2 text-2xl leading-tight sm:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm font-medium text-muted">Brand: {product.brand}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-extrabold text-navy">{formatPrice(product.price)}</span>
            {product.availability && (
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink">{availabilityLabel[product.availability]}</span>
            )}
          </div>
          {product.warranty && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden /> {product.warranty}
            </p>
          )}

          {(product.description || product.shortDescription) && (
            <p className="mt-5 text-muted">{product.description ?? product.shortDescription}</p>
          )}

          {product.highlights.length > 0 && (
            <>
              <h2 className="mt-7 text-lg">Key Features</h2>
              <ul className="mt-3 space-y-2.5">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    <span className="min-w-0 break-words">{h}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappLink(productEnquiryMessage(product.name))} external variant="whatsapp" size="lg" className="sm:flex-1">
              <WhatsAppIcon /> WhatsApp Enquiry
            </Button>
            <Button to="/products" variant="outline" size="lg"><ArrowLeft className="h-4 w-4" aria-hidden /> All Products</Button>
          </div>
          <p className="mt-4 text-xs text-muted">Please contact us to confirm current price and availability.</p>
        </div>
      </div>

      <section className="mt-14" aria-labelledby="spec-heading">
        <h2 id="spec-heading" className="mb-5 text-2xl">Specifications</h2>
        {product.specGroups.length > 0 ? (
          <SpecTable groups={product.specGroups} />
        ) : (
          <p className="rounded-xl bg-surface p-5 text-sm text-muted">
            Detailed specifications for this product are being added. Message us on WhatsApp and we'll share the full details.
          </p>
        )}
      </section>

      <section className="mt-16" aria-labelledby="related-heading">
        <h2 id="related-heading" className="mb-6 text-2xl">Related Products</h2>
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
