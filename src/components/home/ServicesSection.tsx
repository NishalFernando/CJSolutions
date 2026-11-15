import { services } from '../../data/services'
import SectionHeading from '../common/SectionHeading'
import ServiceCard from '../common/ServiceCard'
import Button from '../common/Button'

export default function ServicesSection() {
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <SectionHeading
          eyebrow="IT Services"
          title="Professional Computer & IT Services"
          description="From hardware issues to software problems, our technical support services help keep your devices running smoothly."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.filter((s) => s.homeFeatured).map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand/20 bg-white p-6 text-center shadow-card sm:flex-row sm:p-8 sm:text-left">
          <div>
            <h3 className="text-xl">Need Technical Assistance?</h3>
            <p className="mt-1 text-muted">Contact our team and let us help you find the right solution.</p>
          </div>
          <Button to="/contact#service-enquiry" size="lg">Request a Service</Button>
        </div>
      </div>
    </section>
  )
}
