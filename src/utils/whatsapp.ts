import { BUSINESS_CONFIG, isConfigured } from '../config'

export const hasWhatsApp = () => isConfigured(BUSINESS_CONFIG.whatsappNumber)

export function whatsappLink(message: string): string {
  const text = encodeURIComponent(message)
  if (!hasWhatsApp()) return `https://wa.me/?text=${text}`
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber.replace(/\D/g, '')}?text=${text}`
}

export const productEnquiryMessage = (productName: string) =>
  `Hello ${BUSINESS_CONFIG.name}, I am interested in ${productName}. Could you please provide more details and the current price?`

export const serviceEnquiryMessage = (service: string) =>
  `Hello ${BUSINESS_CONFIG.name}, I need assistance with ${service.toLowerCase()}. Could you please provide more information?`

export const generalEnquiryMessage = () =>
  `Hello ${BUSINESS_CONFIG.name}, I would like to make an enquiry.`
