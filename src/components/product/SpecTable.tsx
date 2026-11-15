import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { SpecGroup } from '../../types'

const COLLAPSE_AFTER = 12

/**
 * Responsive specification list. Labels sit beside values on wider screens and stack on
 * mobile, long values wrap, and very long lists collapse behind a "Show all" button.
 */
export default function SpecTable({ groups }: { groups: SpecGroup[] }) {
  const [open, setOpen] = useState(false)
  const regionId = useId()
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const collapsible = total > COLLAPSE_AFTER

  return (
    <div>
      <div
        id={regionId}
        className={`relative space-y-6 ${collapsible && !open ? 'max-h-[34rem] overflow-hidden' : ''}`}
      >
        {groups.map((group, gi) => (
          <section key={group.title ?? gi} aria-label={group.title ?? 'Specifications'}>
            {group.title && (
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand">{group.title}</h3>
            )}
            <dl className="overflow-hidden rounded-xl border border-line">
              {group.items.map((item, i) =>
                item.label ? (
                  <div
                    key={i}
                    className="grid gap-0.5 border-b border-line px-4 py-3 text-sm last:border-b-0 odd:bg-surface/70 sm:grid-cols-[minmax(11rem,14rem)_1fr] sm:gap-6"
                  >
                    <dt className="font-semibold text-navy">{item.label}</dt>
                    <dd className="min-w-0 break-words text-ink/80">{item.value}</dd>
                  </div>
                ) : (
                  <div key={i} className="border-b border-line px-4 py-3 text-sm text-ink/80 last:border-b-0 odd:bg-surface/70">
                    <dd className="break-words">{item.value}</dd>
                  </div>
                ),
              )}
            </dl>
          </section>
        ))}
        {collapsible && !open && (
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      {collapsible && (
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={regionId}
          className="mx-auto mt-4 flex items-center gap-2 rounded-xl border border-brand/40 px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand/5"
        >
          {open ? 'Show fewer specifications' : `Show all ${total} specifications`}
          <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      )}
    </div>
  )
}
