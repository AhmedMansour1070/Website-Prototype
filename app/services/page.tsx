"use client"

import { ServiceDetails } from "@/components/sections/services/service-details"
import { ServicesOverview } from "@/components/sections/services/services-overview"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowDown, CheckCircle2, ArrowRight, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 12
    }
  }
}

// Parallax effect component
const ParallaxLayer = ({ children, depth = 0.5 }: { children: React.ReactNode, depth?: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  
  useEffect(() => {
    if (!ref.current) return
    const setValues = () => {
      setElementTop(ref.current!.offsetTop)
      setClientHeight(window.innerHeight)
    }
    
    setValues()
    window.addEventListener("resize", setValues)
    return () => window.removeEventListener("resize", setValues)
  }, [ref])

  const { scrollY } = useScroll()
  const y = useTransform(
    scrollY, 
    [elementTop - clientHeight, elementTop + clientHeight], 
    [`${-depth * 100}px`, `${depth * 100}px`]
  )

  return (
    <motion.div ref={ref} style={{ y }} className="relative">
      {children}
    </motion.div>
  )
}

// Float animation component
const FloatingElement = ({ children, duration = 4, delay = 0 }: { children: React.ReactNode, duration?: number, delay?: number }) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -15, 0],
        rotate: [-1, 1, -1]
      }}
      transition={{ 
        repeat: Infinity, 
        repeatType: "reverse", 
        duration, 
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Fade-in component with viewport trigger
const FadeInView = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  )
}

// Background particle animation
const ParticleBackground = ({ count = 50, color = "blue" }: { count?: number, color?: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 10 + 5
        const initialX = Math.random() * 100
        const initialY = Math.random() * 100
        
        const colorClass =
          color === "blue"
            ? "bg-blue-400/20"
            : color === "indigo"
            ? "bg-indigo-400/20"
            : "bg-purple-400/20"
        
        return (
          <motion.div
            key={`particle-${i}`}
            className={`absolute rounded-full ${colorClass}`}
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, Math.random() * 0.5 + 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        )
      })}
    </div>
  )
}

// Enhanced animated background component
const AnimatedBackground = () => {
  const { scrollYProgress } = useScroll()
  
  // Transform scroll progress to control animation intensity
  const animationIntensity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.5, 1]
  )
  
  // Transform scroll progress to control gradient rotation
  const gradientRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 15]
  )
  
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Main gradient background */}
      <motion.div
        style={{
          rotate: gradientRotation,
          scale: animationIntensity
        }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />
      </motion.div>
      
      {/* Animated orbs */}
      {Array.from({ length: 8 }).map((_, i) => {
        const size = Math.random() * 300 + 200
        const xPos = Math.random() * 100
        const yPos = Math.random() * 100
        const delay = i * 0.7
        
        // Color variations based on position
        const colors = [
          "rgba(59, 130, 246, 0.1)",  // blue
          "rgba(99, 102, 241, 0.1)",  // indigo
          "rgba(139, 92, 246, 0.1)",  // purple
          "rgba(79, 70, 229, 0.1)"    // indigo darker
        ]
        
        const color = colors[i % colors.length]
        
        return (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${xPos}%`,
              top: `${yPos}%`,
              background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 30 - 15, 0],
              y: [0, Math.random() * 30 - 15, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay,
            }}
          />
        )
      })}
      
      {/* Grid pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('/images/grid-pattern.svg')",
          backgroundSize: "30px 30px",
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.1, 0.05])
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 25 }).map((_, i) => {
        const size = Math.random() * 5 + 2
        const xPos = Math.random() * 100
        const yPos = Math.random() * 100
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-indigo-500/20"
            style={{
              width: size,
              height: size,
              left: `${xPos}%`,
              top: `${yPos}%`,
            }}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        )
      })}
    </div>
  )
}

// Hero Section Component with enhanced animations
export function ServicesHeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50])
  
  const titleSpring = useSpring(0, { stiffness: 100, damping: 25 })
  
  useEffect(() => {
    titleSpring.set(1)
  }, [titleSpring])
  
  return (
    <div ref={ref} className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden h-screen flex items-center">
      {/* Animated background elements */}
      <ParticleBackground count={30} color="indigo" />
      
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: "url('/images/grid-pattern.svg')", 
            backgroundSize: "30px 30px",
            y: useTransform(scrollYProgress, [0, 1], [0, 150])
          }}
        />
      </div>
      
      <motion.div 
        style={{ opacity, scale, y }}
        className="container mx-auto px-4 py-20 lg:py-28 relative z-10"
      >
        <motion.div className="max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
            className="mb-6 inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-2"
          >
            <motion.span 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-yellow-300" />
            </motion.span>
            Fleet Management Solutions
          </motion.div>
          
          <motion.h1
            style={{ scale: titleSpring }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="block bg-gradient-to-r from-blue-100 to-indigo-100 bg-clip-text text-transparent"
            >
              Transform Your Fleet
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="block relative"
            >
              Operations
              <motion.div 
                className="absolute -right-8 top-0 md:top-4"
                animate={{ 
                  rotate: [0, 15, 0, -15, 0],
                  y: [0, -5, 0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Star className="h-6 w-6 md:h-8 md:w-8 text-yellow-400 fill-yellow-400" />
              </motion.div>
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-lg md:text-xl text-blue-100 mb-10"
          >
            Streamline management, increase efficiency, and reduce operational costs 
            with our comprehensive suite of fleet management services.
          </motion.p>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-white text-indigo-900 hover:bg-blue-50 hover:shadow-lg transition-all duration-300">
                Get Started
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-all duration-300">
                Book a Demo
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </div>
  )
}

// Enhanced Stats Section with animated counters
export function ServicesStatsSection() {
  const stats = [
    { label: "Fleet vehicles managed", value: 125000, suffix: "+" },
    { label: "Hours saved per month", value: 1200, suffix: "" },
    { label: "Cost reduction", value: 25, suffix: "%" },
    { label: "Satisfied customers", value: 98, suffix: "%" }
  ]
  
  return (
    <FadeInView>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 my-12 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-6">
        {stats.map((stat, index) => (
          <motion.div
            key={`stat-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
            className="text-center"
          >
            <FloatingElement delay={index * 0.5}>
              <motion.div
                initial={{ color: "#3b82f6" }}
                animate={{ color: ["#3b82f6", "#6366f1", "#3b82f6"] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                {stat.value.toLocaleString()}{stat.suffix}
              </motion.div>
            </FloatingElement>
            <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </FadeInView>
  )
}

// Enhanced CTA Section with more advanced animations
export function ServicesCTASection() {
  const ref = useRef(null)
  const isInView = useScroll({ target: ref })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="my-20 rounded-3xl overflow-hidden shadow-xl relative"
    >
      <div className="relative bg-gradient-to-r from-indigo-600 to-blue-800">
        {/* Animated background */}
        <ParticleBackground count={15} color="blue" />
        
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="absolute inset-0" style={{ 
            backgroundImage: "url('/images/dots-pattern.svg')", 
            backgroundSize: "50px 50px" 
          }}></div>
        </motion.div>
        
        <div className="relative grid md:grid-cols-2 gap-8 lg:gap-16 p-8 md:p-12 lg:p-16 items-center">
          <div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <FloatingElement duration={5}>
                  Ready to Optimize Your Fleet Operations?
                </FloatingElement>
              </motion.h2>
              
              <motion.p 
                className="text-blue-100 text-lg md:text-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join thousands of businesses that have transformed their fleet management with our comprehensive solutions.
              </motion.p>
              
              <div className="space-y-3 mt-2">
                {["Reduce operational costs by up to 25%", "Improve driver safety and compliance", "Minimize vehicle downtime", "Real-time insights and reporting"].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="flex-shrink-0"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </motion.div>
                    <span className="text-white">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-white text-indigo-700 hover:bg-blue-50 hover:shadow-lg">
                    <span className="flex items-center gap-2">
                      Get Started Now
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Schedule a Consultation
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden md:block h-[400px] rounded-xl overflow-hidden"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Image 
                src="/images/fleet-dashboard.jpg" 
                alt="Fleet Management Dashboard" 
                fill 
                className="object-cover"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tl from-indigo-900/50 to-transparent"
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <FloatingElement duration={3}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-900">Live Data</span>
                </div>
              </FloatingElement>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// Scroll To Top Button Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  // Check scroll position to show/hide button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])
  
  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  
  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : 20
      }}
      whileHover={{ scale: 1.1, backgroundColor: "#4338ca" }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-8 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl"
      aria-label="Scroll to top"
    >
      <ArrowDown className="h-6 w-6 rotate-180" />
    </motion.button>
  )
}

// Enhanced ServicesPage Component with complete page animations
export default function ServicesPage() {
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
      {/* Use the new AnimatedBackground component */}
      <AnimatedBackground />
      
      {/* Hero section */}
      <ServicesHeroSection />
      
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white shadow-xl rounded-3xl p-8 md:p-12 mb-16"
        >
          <ParallaxLayer depth={0.1}>
            <ServicesStatsSection />
          </ParallaxLayer>
          
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                Comprehensive Fleet Management Solutions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our range of integrated services designed to optimize your fleet operations
              </p>
            </motion.div>
            
            <ServicesOverview />
          </motion.div>
          
          <ServiceDetails />
        </motion.div>
        
        <ServicesCTASection />
      </div>
      
      {/* Footer spacing */}
      <div className="h-20"></div>
      
      {/* Add the ScrollToTopButton component */}
      <ScrollToTopButton />
    </motion.div>
  )
}