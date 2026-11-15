import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.to ? <Link to={item.to} className="hover:text-brand">{item.label}</Link> : <span aria-current="page" className="font-medium text-ink">{item.label}</span>}
            {i < items.length - 1 && <ChevronRight className="h-4 w-4" aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
