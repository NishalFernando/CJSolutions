/** Text wordmark tile – illustrative only, not an endorsement or partnership claim. */
export default function BrandCard({ name }: { name: string }) {
  return (
    <div className="flex h-20 items-center justify-center rounded-xl border border-line bg-white px-4 text-lg font-extrabold uppercase tracking-wider text-slate-400 transition hover:border-brand/30 hover:text-navy">
      {name}
    </div>
  )
}
