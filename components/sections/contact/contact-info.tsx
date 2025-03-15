"use client"

import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion"

export function ContactInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const iconVariants = {
    initial: { scale: 0.8, rotate: -10 },
    animate: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 0, y: -2 }
  }

  return (
    <motion.div 
      className="grid gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="group flex items-start gap-4" 
        variants={itemVariants}
        whileHover={{ x: 5 }}
      >
        <motion.div 
          className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-md shadow-blue-200"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Mail className="h-6 w-6 text-white" />
        </motion.div>
        <div className="pt-1">
          <h3 className="font-semibold text-lg text-blue-600">Email</h3>
          <a 
            href="mailto:info@fleetmanager.com" 
            className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300 hover:underline"
          >
            info@fleetmanager.com
          </a>
        </div>
      </motion.div>

      <motion.div 
        className="group flex items-start gap-4" 
        variants={itemVariants}
        whileHover={{ x: 5 }}
      >
        <motion.div 
          className="rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-3 shadow-md shadow-indigo-200"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Phone className="h-6 w-6 text-white" />
        </motion.div>
        <div className="pt-1">
          <h3 className="font-semibold text-lg text-indigo-600">Phone</h3>
          <a 
            href="tel:+15551234567" 
            className="text-gray-600 group-hover:text-indigo-600 transition-colors duration-300 hover:underline"
          >
            +1 (555) 123-4567
          </a>
        </div>
      </motion.div>

      <motion.div 
        className="group flex items-start gap-4" 
        variants={itemVariants}
        whileHover={{ x: 5 }}
      >
        <motion.div 
          className="rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-3 shadow-md shadow-purple-200"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <MapPin className="h-6 w-6 text-white" />
        </motion.div>
        <div className="pt-1">
          <h3 className="font-semibold text-lg text-purple-600">Address</h3>
          <p className="text-gray-600 group-hover:text-purple-600 transition-colors duration-300">
            123 Fleet Street, Business District, City, 12345
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="group flex items-start gap-4" 
        variants={itemVariants}
        whileHover={{ x: 5 }}
      >
        <motion.div 
          className="rounded-full bg-gradient-to-br from-pink-500 to-rose-600 p-3 shadow-md shadow-pink-200"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Clock className="h-6 w-6 text-white" />
        </motion.div>
        <div className="pt-1">
          <h3 className="font-semibold text-lg text-pink-600">Business Hours</h3>
          <p className="text-gray-600 group-hover:text-pink-600 transition-colors duration-300">
            Monday - Friday: 9:00 AM - 5:00 PM
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}