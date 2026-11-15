import type { EnquiryType } from '../types'

export const enquiryTypes: EnquiryType[] = ['Product Inquiry', 'PC Repair', 'Laptop Repair', 'Printer Repair', 'General IT Support', 'Other']

export interface EnquiryForm {
  name: string
  phone: string
  email: string
  type: EnquiryType
  item: string
  message: string
}

export type FormErrors = Partial<Record<keyof EnquiryForm, string>>

export function validateEnquiry(f: EnquiryForm): FormErrors {
  const e: FormErrors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^\+?[\d\s\-()]{7,18}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone number.'
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (f.message.trim().length < 10) e.message = 'Please tell us a little more (at least 10 characters).'
  return e
}

export function buildEnquiryMessage(f: EnquiryForm, businessName: string): string {
  const lines: (string | false)[] = [
    `Hello ${businessName}, I would like to make an enquiry.`,
    '',
    `*Name:* ${f.name.trim()}`,
    `*Phone:* ${f.phone.trim()}`,
    f.email.trim() ? `*Email:* ${f.email.trim()}` : false,
    `*Enquiry Type:* ${f.type}`,
    f.item.trim() ? `*Product / Service:* ${f.item.trim()}` : false,
    '',
    `*Message:*`,
    f.message.trim(),
  ]
  return lines.filter((l): l is string => l !== false).join('\n')
}
