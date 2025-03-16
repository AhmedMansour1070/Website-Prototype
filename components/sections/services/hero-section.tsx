import { motion } from "framer-motion"

export function ServicesHeroSection() {
  return (
    <motion.div 
      className="text-center mb-10 sm:mb-16 pt-16 sm:pt-24 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Our Services
      </motion.h1>
      <motion.p 
        className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        Comprehensive fleet management solutions designed to optimize your operations, reduce costs, and improve
        efficiency.
      </motion.p>
    </motion.div>
  )
}