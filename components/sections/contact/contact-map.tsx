"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Maximize2, ZoomIn, ZoomOut } from "lucide-react"

export function ContactMap() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden shadow-lg border border-blue-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[300px] w-full">
        <Image 
          src="/images/office-map.jpg" 
          alt="Office Location" 
          fill 
          className="object-cover transition-transform duration-700" 
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-indigo-600/30" />
        
        {/* Interactive map pin */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ y: -20 }}
          animate={{ y: [-5, 0, -5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="flex flex-col items-center"
          >
            <MapPin className="h-10 w-10 text-red-500 drop-shadow-lg" fill="#fee2e2" />
            <div className="mt-1 px-3 py-1 rounded-full bg-white shadow-md">
              <span className="text-xs font-medium text-gray-800">Our Office</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Controls overlay - appears on hover */}
        <motion.div 
          className="absolute bottom-3 right-3 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ZoomIn className="h-4 w-4 text-gray-700" />
          </motion.button>
          <motion.button
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ZoomOut className="h-4 w-4 text-gray-700" />
          </motion.button>
          <motion.button
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Maximize2 className="h-4 w-4 text-gray-700" />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Caption bar */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <p className="text-white text-sm font-medium">123 Fleet Street, Business District</p>
      </div>
    </motion.div>
  )
}