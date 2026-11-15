import { ArrowRight, MessageCircle, Monitor, Wrench } from 'lucide-react'
import Button from '../common/Button'
import HeroShowcase from './HeroShowcase'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-800 text-white">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '44px 44px' }}
      />
      <div className="container-x relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-6 lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan">
            Your Trusted Technology Partner
          </p>
          <h1 className="text-4xl leading-[1.1] !text-white sm:text-5xl lg:text-[3.4rem]">
            Everything Your Computer Needs. <span className="text-cyan">All in One Place.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">
            Discover quality computers, accessories and IT solutions. From finding the right technology to professional repairs, CJ Solution is here to help.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/products" size="lg">Explore Products <ArrowRight className="h-5 w-5" aria-hidden /></Button>
            <Button to="/services" size="lg" variant="outline-light">Explore Our Services</Button>
          </div>
          <ul className="mt-10 grid max-w-xl grid-cols-1 divide-white/10 rounded-2xl border border-white/10 bg-white/5 text-sm text-white/80 sm:grid-cols-3 sm:divide-x">
            <li className="flex items-center gap-3 px-4 py-3"><Monitor className="h-5 w-5 shrink-0 text-cyan" aria-hidden /> <span>Computers &amp; accessories</span></li>
            <li className="flex items-center gap-3 px-4 py-3"><Wrench className="h-5 w-5 shrink-0 text-cyan" aria-hidden /> <span>Repairs &amp; IT support</span></li>
            <li className="flex items-center gap-3 px-4 py-3"><MessageCircle className="h-5 w-5 shrink-0 text-cyan" aria-hidden /> <span>Quick WhatsApp enquiries</span></li>
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <HeroShowcase />
        </div>
      </div>
    </section>
  )
}
