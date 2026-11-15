import { Eye, Target } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { HeroArt } from '../components/common/ProductArt'
import SectionHeading from '../components/common/SectionHeading'
import Breadcrumb from '../components/common/Breadcrumb'
import Button from '../components/common/Button'
import { reasons } from '../components/home/WhyChooseUs'
import ContactCTA from '../components/home/ContactCTA'

const offers = [
  'Desktop computers and laptops',
  'Components, accessories and peripherals',
  'Printers, scanners and networking equipment',
  'PC, laptop and printer repairs',
  'Hardware upgrades and software installation',
  'General computer technical support',
]

export default function About() {
  usePageMeta('About Us', 'Learn about CJ Solution, a computer retail and IT services business offering products, repairs and friendly technical support.')
  return (
    <>
      <div className="bg-surface">
        <div className="container-x pb-10 pt-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading as="h1" align="left" title="About CJ Solution" />
              <div className="-mt-6 space-y-4 text-muted">
                <p>CJ Solution is a computer retail and IT services business focused on helping customers find the right technology and get reliable technical assistance.</p>
                <p>We offer a range of computer products, accessories and repair services designed to meet everyday personal and business technology needs.</p>
                <p>Whether you are looking for a new computer, upgrading your existing setup or facing a technical issue, CJ Solution aims to provide practical solutions and friendly customer support.</p>
              </div>
              <Button to="/contact" size="lg" className="mt-7">Get in Touch</Button>
            </div>
            <div className="rounded-3xl bg-navy p-6 shadow-lift">
              <HeroArt className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <div className="card p-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand"><Target className="h-6 w-6" aria-hidden /></div>
            <h2 className="text-2xl">Our Mission</h2>
            <p className="mt-2 text-muted">To help customers find the right technology and provide dependable, easy-to-understand technical support.</p>
          </div>
          <div className="card p-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand"><Eye className="h-6 w-6" aria-hidden /></div>
            <h2 className="text-2xl">Our Vision</h2>
            <p className="mt-2 text-muted">To be a trusted one-stop destination for computer products and IT services in our community.</p>
          </div>
        </div>
      </section>

      <section className="section bg-surface !pt-14">
        <div className="container-x">
          <SectionHeading title="What We Offer" />
          <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {offers.map((o) => (
              <li key={o} className="card flex items-center gap-3 p-4 text-sm font-medium text-ink">
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden /> {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading title="Why Customers Can Choose Us" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6">
                <Icon className="mb-3 h-7 w-7 text-brand" aria-hidden />
                <h3 className="text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  )
}
