import { ContactHeroSection } from "@/components/sections/contact/hero-section"
import { ContactInfo } from "@/components/sections/contact/contact-info"
import { ContactMap } from "@/components/sections/contact/contact-map"
import { ContactForm } from "@/components/sections/contact/contact-form"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
        <div className="space-y-6">
          <ContactHeroSection />
          <ContactInfo />
          <ContactMap />
        </div>
        <ContactForm />
      </div>
    </div>
  )
}

