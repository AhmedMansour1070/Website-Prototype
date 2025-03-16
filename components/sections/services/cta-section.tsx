import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"
import { motion } from "framer-motion"

export function ServicesCTASection() {
  return (
    <motion.section 
      className="py-8 sm:py-16 px-4 sm:px-6 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Ready to optimize your fleet operations?
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-2"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Join thousands of companies that trust our platform for their fleet management needs.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="w-full sm:w-auto">
            <AuthModal triggerText="Sign Up Now" defaultTab="register" className="w-full sm:w-auto" />
          </div>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}