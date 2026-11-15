import { BadgeCheck, Headset, HeartHandshake, Layers } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'

export const reasons = [
  { icon: BadgeCheck, title: 'Quality Products', text: 'Find reliable computer products and accessories for your everyday needs.' },
  { icon: Headset, title: 'Professional Support', text: 'Get assistance from a team focused on solving your technology problems.' },
  { icon: HeartHandshake, title: 'Customer-Focused Service', text: 'We aim to provide friendly support and practical solutions for every customer.' },
  { icon: Layers, title: 'Complete IT Solutions', text: 'From purchasing computer equipment to repairing existing devices, we provide solutions in one place.' },
]

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading title="Why Choose CJ Solution?" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card card-hover p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-cyan">
                <Icon className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
