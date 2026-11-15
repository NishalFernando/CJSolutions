import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Download, Headset, Laptop, Monitor, Printer, Wifi, type LucideIcon } from 'lucide-react'
import type { Service, ServiceIcon } from '../../types'

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  monitor: Monitor,
  laptop: Laptop,
  printer: Printer,
  cpu: Cpu,
  download: Download,
  headset: Headset,
  wifi: Wifi,
}

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon]
  return (
    <article className="card card-hover flex h-full flex-col p-6">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="text-lg font-bold">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{service.shortDescription}</p>
      <Link
        to={`/services#${service.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all"
      >
        Learn More <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  )
}
