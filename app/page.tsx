import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { OfferingsSection } from "@/components/sections/offerings-section"
import { IndustriesSection } from "@/components/sections/industries-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"

// import { PartnersMarquee } from "@/components/sections/partners-marquee"

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <ServicesSection />
      <OfferingsSection />
      <IndustriesSection />
      {/* <PartnersMarquee /> */}
      <NewsletterSection />
    </div>
  )
}
