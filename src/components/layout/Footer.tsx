import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BUSINESS_CONFIG, isConfigured } from '../../config'
import { navLinks } from '../../data/site'
import WhatsAppIcon from '../common/WhatsAppIcon'

const footerServices = [
  { label: 'PC Repairs', hash: 'desktop-repair' },
  { label: 'Laptop Repairs', hash: 'laptop-repair' },
  { label: 'Printer Repairs', hash: 'printer-repair' },
  { label: 'Hardware Upgrades', hash: 'hardware-upgrades' },
  { label: 'Software Installation', hash: 'software-installation' },
  { label: 'IT Support', hash: 'it-support' },
]

const Svg = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
)

const socials: { key: keyof typeof BUSINESS_CONFIG.social; label: string; icon: ReactNode }[] = [
  { key: 'facebook', label: 'Facebook', icon: <Svg><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Svg> },
  { key: 'instagram', label: 'Instagram', icon: <Svg><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></Svg> },
  { key: 'twitter', label: 'Twitter / X', icon: <Svg><path d="M4 4l16 16M20 4L4 20" /></Svg> },
]

const display = (value: string, fallback: string) => (isConfigured(value) ? value : fallback)

export default function Footer() {
  const { phone, whatsappNumber, email, address } = BUSINESS_CONFIG
  const hdg = 'mb-4 text-sm font-bold uppercase tracking-wider !text-white'
  const link = 'text-sm text-white/70 transition hover:text-cyan'
  return (
    <footer className="bg-navy text-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={BUSINESS_CONFIG.logo} alt={BUSINESS_CONFIG.fullName} className="h-10 w-auto rounded-lg bg-white px-3 py-2 box-content" width={180} height={35} loading="lazy" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            A computer retail and IT services business helping customers find the right technology and reliable technical assistance.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ key, label, icon }) => {
              const url = BUSINESS_CONFIG.social[key]
              return url ? (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand">
                  {icon}
                </a>
              ) : (
                <span key={key} aria-label={`${label} (not configured)`} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/40">
                  {icon}
                </span>
              )
            })}
          </div>
        </div>

        <nav aria-label="Quick links">
          <h2 className={hdg}>Quick Links</h2>
          <ul className="space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className={link}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Our services">
          <h2 className={hdg}>Our Services</h2>
          <ul className="space-y-2.5">
            {footerServices.map((s) => (
              <li key={s.hash}><Link to={`/services#${s.hash}`} className={link}>{s.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={hdg}>Contact Information</h2>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden /><span>{display(phone, 'Phone: to be added')}</span></li>
            <li className="flex gap-3"><WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan" /><span>{display(whatsappNumber, 'WhatsApp: to be added')}</span></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden /><span className="break-all">{display(email, 'Email: to be added')}</span></li>
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden /><span>{display(address, 'Address: to be added')}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-xs text-white/60">© 2026 CJ Solution. All Rights Reserved.</div>
      </div>
    </footer>
  )
}
