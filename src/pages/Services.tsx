import { CheckCircle2 } from 'lucide-react'
import { services } from '../data/services'
import { usePageMeta } from '../hooks/usePageMeta'
import { serviceEnquiryMessage, whatsappLink } from '../utils/whatsapp'
import { serviceIcons } from '../components/common/ServiceCard'
import SectionHeading from '../components/common/SectionHeading'
import Breadcrumb from '../components/common/Breadcrumb'
import Button from '../components/common/Button'
import WhatsAppIcon from '../components/common/WhatsAppIcon'

export default function Services() {
  usePageMeta('Computer & IT Repair Services', 'Desktop, laptop and printer repairs, hardware upgrades, software installation, networking and IT support from CJ Solution.')
  return (
    <>
      <div className="bg-surface">
        <div className="container-x pb-2 pt-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
          <SectionHeading as="h1" align="left" title="Computer & IT Repair Services" description="Reliable technical assistance for your computers, laptops and printers." />
        </div>
      </div>

      <div className="container-x section !pt-10 space-y-6">
        {services.map((s) => {
          const Icon = serviceIcons[s.icon]
          return (
            <section key={s.slug} id={s.slug} className="card scroll-mt-28 grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-cyan">
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <h2 className="text-2xl">{s.title}</h2>
                <p className="mt-3 text-muted">{s.description}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button to={`/contact?type=${encodeURIComponent(s.enquiryType)}&item=${encodeURIComponent(s.title)}#service-enquiry`}>Request Service</Button>
                  <Button href={whatsappLink(serviceEnquiryMessage(s.title))} external variant="whatsapp"><WhatsAppIcon className="h-4 w-4" /> WhatsApp</Button>
                </div>
              </div>
              <div className="rounded-xl bg-surface p-5">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted">Common problems we help with</h3>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {s.commonIssues.map((issue) => (
                    <li key={issue} className="flex items-start gap-2 text-sm text-ink">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden /> {issue}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}

        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-center sm:p-12">
          <div aria-hidden className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-brand/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl !text-white">Not sure what's wrong?</h2>
            <p className="mx-auto mt-3 max-w-lg text-white/75">Describe the problem and our team will point you in the right direction.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/contact#service-enquiry" size="lg">Send a Service Enquiry</Button>
              <Button href={whatsappLink(serviceEnquiryMessage('a computer problem'))} external variant="whatsapp" size="lg"><WhatsAppIcon /> WhatsApp Us</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
