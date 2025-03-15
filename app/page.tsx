"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { OfferingsSection } from "@/components/sections/offerings-section"
import { IndustriesSection } from "@/components/sections/industries-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

// import { PartnersMarquee } from "@/components/sections/partners-marquee"

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false)

  // Background animation elements
  const bubbles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 200) + 100,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    duration: Math.floor(Math.random() * 20) + 15
  }))

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Animated background elements */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 opacity-30 blur-3xl"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            zIndex: 0
          }}
          animate={{
            x: [0, 50, -30, 20, 0],
            y: [0, -40, 20, -20, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <OfferingsSection />
        <IndustriesSection />
        {/* <PartnersMarquee /> */}
        <NewsletterSection />
      </div>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-50 transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}