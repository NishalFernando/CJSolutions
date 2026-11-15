import { useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { BUSINESS_CONFIG, isConfigured } from '../config'
import { usePageMeta } from '../hooks/usePageMeta'
import { useToast } from '../components/common/Toast'
import { hasWhatsApp, whatsappLink } from '../utils/whatsapp'
import { buildEnquiryMessage, enquiryTypes, validateEnquiry, type EnquiryForm, type FormErrors } from '../utils/validation'
import type { EnquiryType } from '../types'
import SectionHeading from '../components/common/SectionHeading'
import Breadcrumb from '../components/common/Breadcrumb'
import Button from '../components/common/Button'
import WhatsAppIcon from '../components/common/WhatsAppIcon'

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}

const infoValue = (v: string, fallback: string) => (isConfigured(v) ? v : fallback)

export default function Contact() {
  usePageMeta('Contact Us', 'Contact CJ Solution about products or computer repairs. Send an enquiry via WhatsApp.')
  const [params] = useSearchParams()
  const { notify } = useToast()

  const initialType = enquiryTypes.find((t) => t === params.get('type')) ?? 'Product Inquiry'
  const [form, setForm] = useState<EnquiryForm>({
    name: '', phone: '', email: '', type: initialType as EnquiryType, item: params.get('item') ?? '', message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const set = <K extends keyof EnquiryForm>(key: K, value: EnquiryForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateEnquiry(form)
    setErrors(found)
    if (Object.keys(found).length) {
      notify('error', 'Please correct the highlighted fields.')
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    if (!hasWhatsApp()) {
      notify('error', 'WhatsApp number is not configured yet. Please set it in src/config.ts.')
    } else {
      notify('success', 'Thank you! WhatsApp will open with your enquiry ready to send.')
    }
    window.open(whatsappLink(buildEnquiryMessage(form, BUSINESS_CONFIG.name)), '_blank', 'noopener,noreferrer')
  }

  const addressConfigured = isConfigured(BUSINESS_CONFIG.address)
  const info = [
    { icon: Phone, label: 'Phone', value: infoValue(BUSINESS_CONFIG.phone, 'To be added') },
    { icon: WhatsAppIcon, label: 'WhatsApp', value: infoValue(BUSINESS_CONFIG.whatsappNumber, 'To be added') },
    { icon: Mail, label: 'Email', value: infoValue(BUSINESS_CONFIG.email, 'To be added') },
    { icon: MapPin, label: 'Shop Address', value: infoValue(BUSINESS_CONFIG.address, 'To be added') },
    { icon: Clock, label: 'Opening Hours', value: infoValue(BUSINESS_CONFIG.openingHours, 'To be added') },
  ]

  return (
    <>
      <div className="bg-surface">
        <div className="container-x pb-2 pt-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />
          <SectionHeading as="h1" align="left" title="Get in Touch With CJ Solution" description="Have a question about a product or need help with a computer repair? Contact us today." />
        </div>
      </div>

      <div className="container-x section !pt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <ul className="card divide-y divide-line">
              {info.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon className="h-5 w-5" /></span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">{label}</p>
                    <p className="break-words text-sm font-medium text-ink">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="card overflow-hidden">
              {addressConfigured ? (
                <iframe
                  title="CJ Solution location map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS_CONFIG.address)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              ) : (
                <div className="flex h-64 flex-col items-center justify-center bg-surface px-6 text-center">
                  <MapPin className="h-10 w-10 text-brand/50" aria-hidden />
                  <p className="mt-3 font-semibold text-navy">Our location</p>
                  <p className="text-sm text-muted">The map will appear here once the shop address is added.</p>
                </div>
              )}
            </div>
          </div>

          <form id="service-enquiry" onSubmit={onSubmit} noValidate className="card scroll-mt-28 space-y-5 p-6 sm:p-8">
            <div>
              <h2 className="text-2xl">Send an Enquiry</h2>
              <p className="mt-1 text-sm text-muted">Fill in the form and we'll open WhatsApp with your message ready to send. Nothing is stored on this website.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Full Name" error={errors.name}>
                <input id="name" className="input" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
              </Field>
              <Field id="phone" label="Phone Number" error={errors.phone}>
                <input id="phone" type="tel" className="input" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} />
              </Field>
            </div>
            <Field id="email" label="Email Address" optional error={errors.email}>
              <input id="email" type="email" className="input" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="type" label="Enquiry Type">
                <select id="type" className="input" value={form.type} onChange={(e) => set('type', e.target.value as EnquiryType)}>
                  {enquiryTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field id="item" label="Product or Service" optional>
                <input id="item" className="input" placeholder="e.g. Laptop screen repair" value={form.item} onChange={(e) => set('item', e.target.value)} />
              </Field>
            </div>
            <Field id="message" label="Message" error={errors.message}>
              <textarea id="message" rows={5} className="input resize-y" value={form.message} onChange={(e) => set('message', e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
            </Field>
            <Button type="submit" variant="whatsapp" size="lg" className="w-full sm:w-auto">
              <WhatsAppIcon /> Send via WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
