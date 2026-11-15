import { Star, User } from 'lucide-react'
import { FEATURES } from '../../config'
import { testimonials } from '../../data/testimonials'
import SectionHeading from '../common/SectionHeading'

export default function TestimonialsSection() {
  if (!FEATURES.showTestimonials) return null
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading title="What Our Customers Say" />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="card flex flex-col p-6">
              <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className={`h-4 w-4 ${n <= t.rating ? 'fill-amber-400 text-amber-400' : 'text-line'}`} aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm text-ink">{t.review}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand"><User className="h-5 w-5" aria-hidden /></span>
                <span className="text-sm font-semibold text-navy">{t.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-muted">Sample content for design demonstration – not real customer reviews.</p>
      </div>
    </section>
  )
}
