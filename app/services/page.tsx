"use client"

import { ErrorBoundary } from "@/components/errors/ErrorBoundary"
import { ServiceDetails } from "@/components/sections/services/service-details"
import { ServicesOverview } from "@/components/sections/services/services-overview"
import { ServicesHeroSection } from "@/components/sections/services/hero-section"
import { ServicesCTASection } from "@/components/sections/services/cta-section"
import { motion, useScroll, useTransform } from "framer-motion"

// Shared animation utilities
import { containerVariants, itemVariants } from "@/components/animations/variants"
import { ParallaxLayer } from "@/components/animations/ParallaxLayer"
import { AnimatedBackground } from "@/components/animations/AnimatedBackground"

function ServicesPageContent() {
  const { scrollYProgress } = useScroll()

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [
      "linear-gradient(to bottom right, rgb(249, 250, 251), rgb(239, 246, 255))",
      "linear-gradient(to bottom right, rgb(243, 244, 246), rgb(238, 242, 255))",
      "linear-gradient(to bottom right, rgb(249, 250, 251), rgb(224, 231, 255))",
      "linear-gradient(to bottom right, rgb(243, 244, 246), rgb(219, 234, 254))"
    ]
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ background: backgroundColor }}
      className="min-h-screen relative"
    >
      <AnimatedBackground />

      {/* Hero Section */}
      <ServicesHeroSection />

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white shadow-xl rounded-3xl p-8 md:p-12 mb-16"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <motion.span
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium inline-block mb-3"
              >
                Our Services
              </motion.span>
              <ServicesOverview />
            </motion.div>
          </motion.div>

          <ServiceDetails />
        </motion.div>

        <ServicesCTASection />
      </div>

      <div className="h-20"></div>
    </motion.div>
  )
}

export default function ServicesPage() {
  return (
    <ErrorBoundary>
      <ServicesPageContent />
    </ErrorBoundary>
  )
}
