import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../../data/categories'
import SectionHeading from '../common/SectionHeading'
import ProductImage from '../common/ProductImage'

export default function CategorySection() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading title="Explore Our Products" description="Find the right technology for your everyday needs." />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to={`/products?category=${c.slug}`} className="card card-hover group block overflow-hidden">
                <ProductImage src={c.image} alt={c.name} category={c.slug} className="transition duration-300 group-hover:scale-105" />
                <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
                  <span className="text-sm font-bold leading-tight text-navy">{c.name}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
