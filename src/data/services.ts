import type { Service } from '../types'

export const services: Service[] = [
  {
    slug: 'desktop-repair', title: 'Desktop PC Repair', icon: 'monitor', enquiryType: 'PC Repair', homeFeatured: true,
    shortDescription: 'Professional troubleshooting and repair services for desktop computers, including hardware and software issues.',
    description: 'Our technicians diagnose and repair desktop computer faults, from hardware failures to software and performance problems.',
    commonIssues: ['Computer not turning on', 'Slow performance', 'Random restarts or freezing', 'Blue screen errors', 'Noisy fans or overheating', 'Virus and malware problems'],
  },
  {
    slug: 'laptop-repair', title: 'Laptop Repair', icon: 'laptop', enquiryType: 'Laptop Repair', homeFeatured: true,
    shortDescription: 'Get assistance with laptop performance issues, hardware faults, screen problems, keyboard issues and more.',
    description: 'Whether your laptop has a hardware fault or is simply running poorly, we will help identify the problem and recommend the right solution.',
    commonIssues: ['Laptop not turning on', 'Slow laptop performance', 'Screen problems', 'Keyboard and touchpad issues', 'Overheating', 'Battery-related problems', 'Software and operating system issues'],
  },
  {
    slug: 'printer-repair', title: 'Printer Repair', icon: 'printer', enquiryType: 'Printer Repair', homeFeatured: true,
    shortDescription: 'Printer troubleshooting, maintenance and repair services to keep your printing equipment working properly.',
    description: 'Help with inkjet, ink tank and laser printers, including troubleshooting, maintenance and fault diagnosis.',
    commonIssues: ['Printer not printing', 'Paper jams', 'Poor print quality or streaks', 'Printer not detected by computer', 'Wi-Fi printing problems', 'Scanner or copier faults'],
  },
  {
    slug: 'hardware-upgrades', title: 'Hardware Upgrades', icon: 'cpu', enquiryType: 'General IT Support', homeFeatured: true,
    shortDescription: "Improve your computer's performance with RAM upgrades, SSD installations and other hardware improvements.",
    description: 'Give an existing computer a new lease of life with the right upgrades. We help you choose compatible parts and install them.',
    commonIssues: ['RAM upgrades', 'SSD installation and cloning', 'Graphics card installation', 'Power supply replacement', 'Cooling improvements', 'Storage expansion'],
  },
  {
    slug: 'software-installation', title: 'Software Installation', icon: 'download', enquiryType: 'General IT Support', homeFeatured: true,
    shortDescription: 'Operating system installation, driver configuration, software setup and general troubleshooting.',
    description: 'We handle operating system and software setup so your computer is ready to use and configured properly.',
    commonIssues: ['Operating system installation', 'Driver installation and configuration', 'Office and productivity software setup', 'Antivirus setup', 'Software errors and crashes', 'Data transfer to a new computer'],
  },
  {
    slug: 'it-support', title: 'IT Support & Maintenance', icon: 'headset', enquiryType: 'General IT Support', homeFeatured: true,
    shortDescription: 'Technical assistance, system maintenance and computer-related support for home and business users.',
    description: 'General technical assistance and routine maintenance to keep your devices healthy, for both home and business users.',
    commonIssues: ['Routine system clean-up', 'Performance tuning', 'Dust cleaning and maintenance', 'Backup assistance', 'Email and account setup', 'General how-to help'],
  },
  {
    slug: 'networking', title: 'Networking Setup & Troubleshooting', icon: 'wifi', enquiryType: 'General IT Support',
    shortDescription: 'Router, Wi-Fi and wired network setup and troubleshooting.',
    description: 'Get your home or office network connected and working reliably, from router setup to diagnosing connection problems.',
    commonIssues: ['Router and Wi-Fi setup', 'Weak or dropping signal', 'No internet connection', 'Network printer setup', 'Wired network cabling and switches', 'Shared folders and devices'],
  },
]
