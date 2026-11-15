import { products } from '../../data/products'
import SectionHeading from '../common/SectionHeading'
import ProductCard from '../common/ProductCard'
import Button from '../common/Button'

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 8)
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <SectionHeading title="Featured Products" description="Explore some of our popular computer products and accessories." />
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <p className="mt-6 text-center text-xs text-muted">Prices are in LKR. Please contact us to confirm current availability.</p>
        <div className="mt-6 text-center">
          <Button to="/products" size="lg">View All Products</Button>
        </div>
      </div>
    </section>
  )
}
