import { motion } from 'framer-motion';

export function AboutHeroSection() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Fleet Management System
        </motion.h1>
        
        <motion.p 
          className="text-base md:text-lg mb-6 md:mb-8 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Fleet Management System is a comprehensive solution designed to help businesses efficiently manage their
          vehicle fleets, drivers, maintenance schedules, and trip data. Our platform provides real-time insights and
          analytics to optimize operations, reduce costs, and improve overall fleet performance.
        </motion.p>
        
        <motion.div
          className="w-full h-1 bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </div>
    </div>
  )
}