import Button from '../common/Button'
import WhatsAppIcon from '../common/WhatsAppIcon'
import { generalEnquiryMessage, whatsappLink } from '../../utils/whatsapp'

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
      <div className="container-x relative py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-2xl text-3xl !text-white sm:text-4xl">Need Help With Your Computer?</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/75">
          Whether you're looking for a new device or need professional repair assistance, CJ Solution is ready to help.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/contact" size="lg">Contact Us</Button>
          <Button href={whatsappLink(generalEnquiryMessage())} external variant="whatsapp" size="lg"><WhatsAppIcon /> WhatsApp Us</Button>
        </div>
      </div>
    </section>
  )
}
