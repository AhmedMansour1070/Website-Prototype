"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  ChevronDown, 
  Truck, 
  Users, 
  PenToolIcon as Tool, 
  Map, 
  Fuel, 
  Sparkles, 
  ArrowRight,
  Star
} from "lucide-react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import { AuthModal } from "@/components/auth-modal"
import Link from "next/link"

const services = [
  {
    id: "fleet-management",
    title: "Fleet Management",
    description: "Comprehensive vehicle tracking and management system",
    icon: Truck,
    image: "/images/fleet-management.jpg",
    features: [
      "Real-time vehicle tracking and location monitoring",
      "Vehicle utilization and performance analytics",
      "Comprehensive vehicle history and documentation",
      "Automated vehicle assignment and scheduling",
      "Custom vehicle grouping and categorization",
      "Vehicle acquisition and disposal management",
    ],
    color: "bg-blue-100 text-blue-600",
    iconColor: "text-blue-500",
    gradient: "from-blue-500 to-indigo-500",
    featureColor: "text-blue-700",
    highlightColor: "bg-blue-50",
  },
  {
    id: "driver-management",
    title: "Driver Management",
    description: "Complete driver monitoring and compliance solution",
    icon: Users,
    image: "/images/driver-management.jpg",
    features: [
      "Driver performance monitoring and scoring",
      "License and certification tracking with expiration alerts",
      "Hours of service compliance and reporting",
      "Driver training and qualification management",
      "Incident and violation tracking",
      "Driver assignment and scheduling",
    ],
    color: "bg-green-100 text-green-600",
    iconColor: "text-green-500",
    gradient: "from-green-500 to-teal-500",
    featureColor: "text-green-700",
    highlightColor: "bg-green-50",
  },
  {
    id: "maintenance-tracking",
    title: "Maintenance Tracking",
    description: "Proactive maintenance management to prevent costly breakdowns",
    icon: Tool,
    image: "/images/maintenance-tracking.jpg",
    features: [
      "Scheduled maintenance reminders and alerts",
      "Maintenance history and documentation",
      "Service provider management",
      "Parts inventory tracking",
      "Maintenance cost analysis",
      "Warranty tracking and management",
    ],
    color: "bg-yellow-100 text-yellow-600",
    iconColor: "text-yellow-500",
    gradient: "from-yellow-500 to-amber-500",
    featureColor: "text-yellow-700",
    highlightColor: "bg-yellow-50",
  },
  {
    id: "trip-analytics",
    title: "Trip Analytics",
    description: "Detailed trip data analysis for route optimization",
    icon: Map,
    image: "/images/trip-analytics.jpg",
    features: [
      "Route planning and optimization",
      "Trip history and reporting",
      "Fuel consumption analysis by trip",
      "Driver behavior analysis during trips",
      "Geofencing and location-based alerts",
      "Customer delivery time tracking",
    ],
    color: "bg-purple-100 text-purple-600",
    iconColor: "text-purple-500",
    gradient: "from-purple-500 to-indigo-500",
    featureColor: "text-purple-700",
    highlightColor: "bg-purple-50",
  },
  {
    id: "fuel-management",
    title: "Fuel Management",
    description: "Comprehensive fuel usage tracking and optimization",
    icon: Fuel,
    image: "/images/fuel-management.jpg",
    features: [
      "Fuel consumption tracking and reporting",
      "Fuel card integration and management",
      "Fuel theft and fraud detection",
      "Fuel economy analysis by vehicle and driver",
      "Fuel cost forecasting",
      "Alternative fuel tracking and analysis",
    ],
    color: "bg-red-100 text-red-600",
    iconColor: "text-red-500",
    gradient: "from-red-500 to-pink-500",
    featureColor: "text-red-700",
    highlightColor: "bg-red-50",
  },
]

export function ServiceDetails() {
  const [activeService, setActiveService] = useState<string | null>(null)
  const serviceRefs = useRef<{[key: string]: HTMLElement | null}>({})
  const [highlightedFeature, setHighlightedFeature] = useState<{serviceId: string, featureIndex: number} | null>(null)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [isParticleAnimationActive, setIsParticleAnimationActive] = useState(true)
  
  // Parallax effect references
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Ensure particle animation is active
  useEffect(() => {
    setIsParticleAnimationActive(true)
    return () => setIsParticleAnimationActive(false)
  }, [])
  
  // Animation variants with improved smoothness
  const imageVariants = {
    hover: { 
      scale: 1.05,
      filter: "brightness(1.1)",
      transition: { duration: 0.7, ease: "easeOut" } 
    },
    initial: { 
      scale: 1,
      filter: "brightness(1)",
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  }
  
  const featureVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.5, 
        delay: i * 0.1,
        ease: "easeOut"
      } 
    }),
    hover: { 
      scale: 1.02,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }
  
  const toggleService = (id: string) => {
    setActiveService(activeService === id ? null : id)
    // Improved smooth scroll to the service section when opening
    if (activeService !== id && serviceRefs.current[id]) {
      serviceRefs.current[id]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }
  }

  const setServiceRef = (id: string) => (el: HTMLElement | null) => {
    serviceRefs.current[id] = el
  }
  
  // Improved Intersection Observer hooks with better thresholds
  const sectionRefs = useRef(services.map(() => React.createRef<HTMLElement>()))
  const sectionInView = services.map((_, index) => {
    return useInView(sectionRefs.current[index], { 
      margin: "-20% 0px -20% 0px",
      once: false 
    })
  })
  
  // Define ParticleColor type
  type ParticleColor = "blue" | "green" | "yellow" | "purple" | "red";
  
  // Enhanced Floating particles component with improved scattering
  const FloatingParticles = ({ color = "blue" as ParticleColor, count = 15 }) => {
    const particles = Array.from({ length: count }).map((_, i: number) => {
      const size = Math.random() * 6 + 2
      const initialX = Math.random() * 100
      const initialY = Math.random() * 100
      const xMovement = Math.random() * 20 - 10
      const yMovement = Math.random() * 20 - 10
      const duration = Math.random() * 10 + 8
      
      const colorClasses = {
        blue: "bg-blue-400",
        green: "bg-green-400",
        yellow: "bg-yellow-400", 
        purple: "bg-purple-400",
        red: "bg-red-400"
      }
      
      return (
        <motion.div
          key={i}
          className={`absolute rounded-full ${colorClasses[color]} opacity-40`}
          initial={{
            x: `${initialX}%`,
            y: `${initialY}%`,
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            x: isParticleAnimationActive ? [`${initialX}%`, `${initialX + xMovement}%`] : `${initialX}%`,
            y: isParticleAnimationActive ? [`${initialY}%`, `${initialY + yMovement}%`] : `${initialY}%`,
            scale: isParticleAnimationActive ? [0.5, Math.random() * 0.5 + 0.8, 0.5] : 0.5,
            opacity: isParticleAnimationActive ? [0, 0.5, 0] : 0
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          style={{
            width: size,
            height: size
          }}
        />
      )
    })
    
    return <>{particles}</>
  }
  
  const getColorForService = (index: number) => {
    const colors = ["blue", "green", "yellow", "purple", "red"]
    return colors[index % colors.length]
  }

  return (
    <div className="space-y-16 relative rounded-xl" ref={containerRef}>
      {/* Global floating elements with improved animation */}
      <div className="fixed -z-10 inset-0 opacity-30 pointer-events-none overflow-hidden">
        <motion.div
          style={{ 
            backgroundImage: "url('/images/pattern.svg')", 
            backgroundSize: "40px 40px",
          }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)`,
                width: `${Math.random() * 300 + 200}px`,
                height: `${Math.random() * 300 + 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0.8, opacity: 0.1 }}
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16 relative overflow-hidden rounded-xl"
      >
        {/* Background decoration with improved animation */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            style={{ 
              top: "-50%", 
              left: "25%", 
              width: "50%", 
              height: "200%" 
            }}
          />
        </div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="inline-block mb-2 px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
        >
          Detailed Services
        </motion.div>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent relative"
        >
          How We Can Help You
          <motion.div
            className="absolute -right-8 top-0"
            animate={{ 
              rotate: [0, 15, 0, -15, 0],
              y: [0, -5, 0, -5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
          </motion.div>
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Explore our comprehensive fleet management solutions in detail
        </motion.p>
      </motion.div>
      
      {services.map((service, index: number) => (
        <motion.section
          key={service.id}
          id={service.id}
          ref={(el: HTMLElement | null) => {
            setServiceRef(service.id)(el)
            if (sectionRefs.current[index].current) {
              sectionRefs.current[index].current = el
            }
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className={`py-16 rounded-3xl shadow-lg border overflow-hidden scroll-mt-24 relative ${
            index % 2 === 0? "bg-gradient-to-r from-gray-50 to-blue-50 border-blue-100/50" 
            : "bg-gradient-to-r from-indigo-50 to-gray-50 border-indigo-100/50"
        }`}
        onMouseEnter={() => setHoveredService(service.id)}
        onMouseLeave={() => setHoveredService(null)}
      >
        {/* Animated background with improved performance */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <motion.div 
              className="absolute inset-0" 
              style={{ 
                backgroundImage: "url('/images/pattern.svg')", 
                backgroundSize: "40px 40px",
              }}
              initial={{ rotate: 0, scale: 1 }}
              animate={{ 
                rotate: sectionInView[index] ? 5 : 0,
                scale: sectionInView[index] ? 1.2 : 1 
              }}
              transition={{ duration: 2.0, ease: "easeInOut" }}
            />
          </div>
        </div>
        
        {/* Enhanced floating particles specific to this section with improved scattering */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingParticles color={getColorForService(index) as ParticleColor} count={15} />
        </div>

        <div className="container mx-auto px-4 relative z-10 rounded-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`order-2 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
              <motion.div
                initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm mb-5 shadow-sm bg-gradient-to-r ${service.gradient} text-white font-medium`}
                >
                  <service.icon className="h-4 w-4" />
                  <span>{service.title}</span>
                </motion.div>
                
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent flex items-center`}>
                  {service.title} 
                  <div className="inline-block ml-2">
                    <motion.div
                      animate={{ 
                        rotate: sectionInView[index] ? 360 : 0,
                        scale: sectionInView[index] ? [1, 1.2, 1] : 1
                      }}
                      transition={{ 
                        rotate: { duration: 2, delay: 0.5, ease: "easeInOut" },
                        scale: { duration: 1.5, repeat: sectionInView[index] ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" }
                      }}
                    >
                      <Sparkles className="h-6 w-6 inline-block text-yellow-400" />
                    </motion.div>
                  </div>
                </h2>
                
                <motion.p 
                  className="text-gray-600 mb-8 text-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Button
                    variant="outline"
                    className={`mb-8 flex items-center gap-2 shadow-sm hover:shadow-md hover:bg-gradient-to-r ${service.gradient} hover:text-white transition-all duration-300 group rounded-xl`}
                    onClick={() => toggleService(service.id)}
                  >
                    {activeService === service.id ? "Show Less" : "Show Details"}
                    <motion.div
                      animate={{ 
                        rotate: activeService === service.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="ml-1"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>

                <AnimatePresence mode="wait">
                  {activeService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden mb-8 rounded-xl"
                    >
                      <motion.div 
                        className="space-y-4 bg-white p-6 rounded-xl overflow-hidden"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        style={{
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)"
                        }}
                      >
                        <h3 className={`font-semibold text-lg mb-2 ${service.featureColor}`}>
                          Key Features:
                        </h3>
                        {service.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            custom={i}
                            variants={featureVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            className={`flex items-start p-2 rounded-lg transition-colors duration-200 ${
                              highlightedFeature?.serviceId === service.id && 
                              highlightedFeature?.featureIndex === i ? 
                              service.highlightColor : ''
                            }`}
                            onMouseEnter={() => setHighlightedFeature({ serviceId: service.id, featureIndex: i })}
                            onMouseLeave={() => setHighlightedFeature(null)}
                          >
                            <motion.div 
                              className="flex-shrink-0 h-6 w-6 mr-3"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                              <CheckCircle2 className={`h-6 w-6 ${service.iconColor}`} />
                            </motion.div>
                            <span className="text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div 
                  className="mt-8"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <AuthModal 
                    triggerText={`Get Started with ${service.title}`} 
                    defaultTab="register" 
                    className={`bg-gradient-to-r ${service.gradient} text-white hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 rounded-xl`}
                  />
                </motion.div>
              </motion.div>
            </div>
            
            <div className={`order-1 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
              <motion.div 
                initial={{ scale: 0.95, opacity: 0.8 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                variants={imageVariants}
                animate={sectionInView[index] || hoveredService === service.id ? "hover" : "initial"}
                className="relative h-[300px] md:h-[450px] rounded-xl overflow-hidden shadow-xl group"
              >
                <Image 
                  src={service.image || "/placeholder.svg"} 
                  alt={service.title} 
                  fill 
                  className="object-cover transition-transform duration-900 ease-out group-hover:scale-105" 
                  priority={index < 2} // Prioritize loading of first two images
                />
                
                {/* Animated gradient overlay with improved animation */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-xl`}
                  initial={{ opacity: 0.3 }}
                  animate={{ 
                    opacity: sectionInView[index] ? [0.3, 0.4, 0.3] : 0.3
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: sectionInView[index] ? Infinity : 0,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }}
                ></motion.div>
                
                {/* Enhanced glowing effect when hovered */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700 rounded-xl"
                  style={{
                    background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`
                  }}
                ></motion.div>
                
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 rounded-b-xl"
                  initial={{ y: 10, opacity: 0.9 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                  <h3 className="text-white text-xl font-semibold">{service.title}</h3>
                  <div className="flex items-center mt-1">
                    <p className="text-white/80">Premium Service</p>
                    <div className="ml-2 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + star * 0.1, duration: 0.4, ease: "easeOut" }}
                        >
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <motion.div 
                    className="flex mt-4 overflow-hidden rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  >
                    <Link href={`#${service.id}`} scroll={false}>
                      <Button 
                        size="sm" 
                        className={`bg-white text-gray-800 hover:bg-white/90 group flex items-center rounded-xl`}
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    ))}
    
    {/* Final CTA section with enhanced animations */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 px-4 rounded-3xl shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center relative overflow-hidden"
    >
      {/* Enhanced animated background bubbles with better scattering */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i: number) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${Math.random() * 50 + 20}px`,
              height: `${Math.random() * 50 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              y: [0, -Math.random() * 150 - 50], 
              x: [0, (Math.random() * 40 - 20)],
              opacity: [0.1, 0],
              scale: [1, Math.random() * 0.5 + 0.5]
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4">
          Ready to transform your fleet operations?
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-xl text-blue-100 mb-8"
        >
          Join thousands of companies that trust our platform for their fleet management needs.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            <AuthModal 
              triggerText="Sign Up Now" 
              defaultTab="register" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-xl rounded-xl" 
            />
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl">
                Contact Sales
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  </div>
)
}