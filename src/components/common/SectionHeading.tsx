interface Props {
  title: string
  description?: string
  eyebrow?: string
  align?: 'center' | 'left'
  light?: boolean
  as?: 'h1' | 'h2'
}

export default function SectionHeading({ title, description, eyebrow, align = 'center', light, as: Tag = 'h2' }: Props) {
  return (
    <div className={`mb-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${light ? 'text-cyan' : 'text-brand'}`}>{eyebrow}</p>
      )}
      <Tag className={`text-3xl sm:text-4xl ${light ? '!text-white' : ''}`}>{title}</Tag>
      {description && <p className={`mt-3 text-base sm:text-lg ${light ? 'text-white/75' : 'text-muted'}`}>{description}</p>}
    </div>
  )
}
