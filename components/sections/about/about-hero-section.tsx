"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export function AboutHeroSection() {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 shadow-sm border border-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-100 opacity-50"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-100 opacity-50"
        animate={{ 
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.5, 0.4, 0.6, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Small decorative elements */}
      <motion.div 
        className="absolute top-1/4 right-1/4 h-5 w-5 rounded-full bg-blue-400 opacity-20"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/3 h-3 w-3 rounded-full bg-indigo-500 opacity-20"
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
      
      <div className="relative max-w-4xl mx-auto">
        <motion.div 
          className="inline-block mb-2 px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          About Us
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          About Fleet Management System
        </motion.h1>
        
        <motion.p 
          className="text-lg mb-8 text-gray-700 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Fleet Management System is a comprehensive solution designed to help businesses efficiently manage their vehicle
          fleets, drivers, maintenance schedules, and trip data. Our platform provides real-time insights and analytics to
          optimize operations, reduce costs, and improve overall fleet performance.
        </motion.p>
        
        <motion.a 
          href="#learn-more" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Learn More 
          <motion.span
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  )
}