/** Brand tile: shows the logo from src/assets/brands/<name>.(svg|png|webp|jpg), else the brand name as text. */
const logos = import.meta.glob('../../assets/brands/*.{svg,png,webp,jpg,jpeg}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const logoFor = (name: string) => {
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '')
  const hit = Object.entries(logos).find(([path]) => {
    const stem = path.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '')
    return stem === key
  })
  return hit?.[1]
}

export default function BrandCard({ name }: { name: string }) {
  const logo = logoFor(name)
  return (
    <div className="group flex h-24 items-center justify-center rounded-xl border border-line bg-white px-5 transition hover:border-brand/30 hover:shadow-md">
      {logo ? (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          className="h-12 w-auto max-w-[8.5rem] object-contain transition duration-300 group-hover:scale-110"
        />
      ) : (
        <span className="text-lg font-extrabold uppercase tracking-wider text-slate-400 transition group-hover:text-navy">{name}</span>
      )}
    </div>
  )
}
