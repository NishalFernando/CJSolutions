import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { BUSINESS_CONFIG } from '../../config'
import { navLinks } from '../../data/site'
import { generalEnquiryMessage, whatsappLink } from '../../utils/whatsapp'
import WhatsAppIcon from '../common/WhatsAppIcon'
import Button from '../common/Button'
import AnnouncementBar from './AnnouncementBar'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submitSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
    setSearchOpen(false)
    setQuery('')
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-1 py-2 text-sm font-semibold transition-colors ${
      isActive ? 'text-brand after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand' : 'text-ink hover:text-brand'
    }`

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Link to="/" aria-label={`${BUSINESS_CONFIG.name} home`} className="shrink-0">
            <img src={BUSINESS_CONFIG.logo} alt={BUSINESS_CONFIG.fullName} className="h-9 w-auto sm:h-11" width={180} height={35} />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>{l.label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Search products"
              aria-expanded={searchOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-surface hover:text-brand"
            >
              <Search className="h-5 w-5" />
            </button>
            <Button href={whatsappLink(generalEnquiryMessage())} external variant="whatsapp" size="sm" className="hidden sm:inline-flex" ariaLabel="Chat with us on WhatsApp">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
            </Button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-surface lg:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-line bg-white">
            <form onSubmit={submitSearch} role="search" className="container-x flex gap-2 py-3">
              <label htmlFor="header-search" className="sr-only">Search products</label>
              <input
                id="header-search"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by product, brand or category…"
                className="input"
              />
              <Button type="submit" size="md">Search</Button>
            </form>
          </div>
        )}

        {menuOpen && (
          <nav id="mobile-menu" aria-label="Mobile navigation" className="border-t border-line bg-white lg:hidden">
            <div className="container-x flex flex-col py-3">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) => `rounded-lg px-3 py-3 text-base font-semibold ${isActive ? 'bg-brand/10 text-brand' : 'text-ink hover:bg-surface'}`}
                >
                  {l.label}
                </NavLink>
              ))}
              <Button href={whatsappLink(generalEnquiryMessage())} external variant="whatsapp" className="mt-3 w-full">
                <WhatsAppIcon /> WhatsApp Us
              </Button>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
