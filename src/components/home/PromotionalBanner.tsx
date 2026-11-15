import { ArrowRight } from 'lucide-react'
import Button from '../common/Button'
import ProductArt from '../common/ProductArt'

export default function PromotionalBanner() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-navy">
          <div aria-hidden className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
          <div className="relative grid items-center gap-8 p-8 sm:p-12 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan">New Technology</p>
              <h2 className="text-3xl !text-white sm:text-4xl">Upgrade Your Technology. Experience Better Performance.</h2>
              <p className="mt-4 max-w-md text-white/75">
                Looking for a new computer, laptop or essential accessories? Find the right solution with CJ Solution.
              </p>
              <Button to="/products" size="lg" className="mt-7">Explore Products <ArrowRight className="h-5 w-5" aria-hidden /></Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-2xl border border-white/10"><ProductArt category="laptops" className="aspect-[4/3] h-full w-full" /></div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10"><ProductArt category="desktop-computers" className="aspect-[4/3] h-full w-full" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
