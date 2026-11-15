import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { generalEnquiryMessage, whatsappLink } from '../../utils/whatsapp'
import WhatsAppIcon from '../common/WhatsAppIcon'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-navy shadow-card transition duration-200 hover:text-brand ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <a
        href={whatsappLink(generalEnquiryMessage())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1FAF54] text-white shadow-lift transition hover:scale-105 hover:bg-[#178f43]"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
