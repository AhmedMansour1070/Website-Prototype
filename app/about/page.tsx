import { AboutHeroSection } from "@/components/sections/about/about-hero-section"
import { MissionSection } from "@/components/sections/about/mission-section"
import { FeaturesSection } from "@/components/sections/about/features-section"
import { TeamSection } from "@/components/sections/about/team-section"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <AboutHeroSection />
      <div className="mt-12">
        <MissionSection />
      </div>
      <FeaturesSection />
      <TeamSection />
    </div>
  )
}

