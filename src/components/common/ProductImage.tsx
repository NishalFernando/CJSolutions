import { useState } from 'react'
import type { CategorySlug } from '../../types'
import ProductArt from './ProductArt'

interface Props {
  src?: string
  alt: string
  category: CategorySlug
  className?: string
  /** Load immediately (use for the main image on a details page). */
  eager?: boolean
}

/**
 * Real product photos are shown whole (object-contain on white) so nothing is cropped.
 * Without a photo — or if it fails to load — the built-in illustration is shown.
 */
export default function ProductImage({ src, alt, category, className = '', eager }: Props) {
  const [failed, setFailed] = useState(false)
  const hasPhoto = !!src && !failed
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden ${hasPhoto ? 'bg-white' : 'bg-surface'} ${className}`}>
      {hasPhoto ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-3"
        />
      ) : (
        <div role="img" aria-label={alt} className="h-full w-full">
          <ProductArt category={category} className="h-full w-full" />
        </div>
      )}
    </div>
  )
}
