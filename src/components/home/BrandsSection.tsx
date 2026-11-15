import { brands } from '../../data/site'
import SectionHeading from '../common/SectionHeading'
import BrandCard from '../common/BrandCard'

export default function BrandsSection() {
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <SectionHeading title="Popular Technology Brands" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((b) => <li key={b}><BrandCard name={b} /></li>)}
        </ul>
        <p className="mt-5 text-center text-xs text-muted">Brand names are shown for illustration only and do not imply any partnership or authorised dealership.</p>
      </div>
    </section>
  )
}
