import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { getCategory } from '../../data/categories'
import { availabilityLabel, formatPrice } from '../../utils/format'
import { productEnquiryMessage, whatsappLink } from '../../utils/whatsapp'
import ProductImage from './ProductImage'
import Button from './Button'
import WhatsAppIcon from './WhatsAppIcon'

const badgeStyle = {
  'in-stock': 'bg-emerald-50 text-emerald-700',
  limited: 'bg-amber-50 text-amber-700',
  'out-of-stock': 'bg-red-50 text-red-700',
}

export default function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category)
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`} className="block overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
          category={product.category}
          className="transition duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold uppercase tracking-wide text-brand">{category?.name}</span>
          {product.availability && (
            <span className={`rounded-full px-2 py-0.5 font-semibold ${badgeStyle[product.availability]}`}>
              {availabilityLabel[product.availability]}
            </span>
          )}
        </div>
        <h3 className="text-base font-bold leading-snug sm:text-lg">
          <Link to={`/products/${product.id}`} className="hover:text-brand">{product.name}</Link>
        </h3>
        <p className="text-xs font-medium text-muted">{product.brand}</p>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{product.shortDescription}</p>
        <p className={`mt-3 text-sm font-bold ${product.price === undefined ? 'text-muted' : 'text-navy'}`}>{formatPrice(product.price)}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button to={`/products/${product.id}`} variant="outline" size="sm">View Details</Button>
          <Button href={whatsappLink(productEnquiryMessage(product.name))} external variant="whatsapp" size="sm" ariaLabel={`WhatsApp enquiry about ${product.name}`}>
            <WhatsAppIcon className="h-4 w-4" /> Enquire
          </Button>
        </div>
      </div>
    </article>
  )
}
