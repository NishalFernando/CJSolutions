import { usePageMeta } from '../hooks/usePageMeta'
import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import PromotionalBanner from '../components/home/PromotionalBanner'
import ServicesSection from '../components/home/ServicesSection'
import WhyChooseUs from '../components/home/WhyChooseUs'
import BrandsSection from '../components/home/BrandsSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import ContactCTA from '../components/home/ContactCTA'

export default function Home() {
  usePageMeta('', 'CJ Solution – quality computers, laptops, accessories, printers and networking, plus professional PC, laptop and printer repair services.')
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <PromotionalBanner />
      <ServicesSection />
      <WhyChooseUs />
      <BrandsSection />
      <TestimonialsSection />
      <ContactCTA />
    </>
  )
}
