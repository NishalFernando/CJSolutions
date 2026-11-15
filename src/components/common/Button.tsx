import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'light' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 whitespace-nowrap active:scale-[0.98] disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white shadow-sm hover:bg-brand-600',
  secondary: 'bg-navy text-white hover:bg-navy-800',
  outline: 'border border-brand/40 text-brand bg-white hover:bg-brand/5 hover:border-brand',
  whatsapp: 'bg-[#1FAF54] text-white hover:bg-[#178f43]',
  light: 'bg-white text-navy hover:bg-surface',
  'outline-light': 'border border-white/40 text-white hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
}

interface Props {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  to?: string
  href?: string
  state?: unknown
  onClick?: () => void
  type?: 'button' | 'submit'
  external?: boolean
  ariaLabel?: string
}

export default function Button({
  variant = 'primary', size = 'md', className = '', children, to, href, state, onClick, type = 'button', external, ariaLabel,
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) return <Link to={to} state={state} className={cls} aria-label={ariaLabel}>{children}</Link>
  if (href)
    return (
      <a href={href} className={cls} aria-label={ariaLabel} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  return <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>{children}</button>
}
