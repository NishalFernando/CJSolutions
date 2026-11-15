import { asset } from './utils/asset'

/**
 * Central business configuration. Update the values below and the whole
 * website (header, footer, contact page, WhatsApp links, map) updates.
 */
export const BUSINESS_CONFIG = {
  name: 'CJ Solution',
  fullName: 'CJ SOLUTION – COMPUTER & IT SERVICES',
  /** Logo served from /public. Replace public/logo.png with the supplied logo, or change this path. */
  logo: asset('/logo.png'),
  /** Digits only, with country code, no "+" (e.g. "94771234567"). */
  whatsappNumber: 'YOUR_WHATSAPP_NUMBER',
  phone: 'YOUR_PHONE_NUMBER',
  email: 'YOUR_EMAIL',
  address: 'YOUR_BUSINESS_ADDRESS',
  openingHours: 'YOUR_OPENING_HOURS',
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
}

export const FEATURES = {
  /** Set to false to hide the placeholder testimonials until real reviews exist. */
  showTestimonials: true,
}

export const isConfigured = (value: string) => value !== '' && !value.startsWith('YOUR_')
