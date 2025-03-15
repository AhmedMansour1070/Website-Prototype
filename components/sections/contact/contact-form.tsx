"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { SendIcon, User, Briefcase, MessageSquare, Phone, Mail } from "lucide-react"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState(prev => ({
      ...prev,
      [id.replace("-", "")]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
      className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    })
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white shadow-lg border-none overflow-hidden">
        <div className="absolute h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 top-0"></div>
        <CardHeader className="pb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
              Send us a message
            </CardTitle>
            <CardDescription className="mt-2">
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.form 
            className="space-y-4" 
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="grid gap-4 sm:grid-cols-2" variants={itemVariants}>
              <div className="space-y-2 relative">
                <label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                  First name
                </label>
                <div className="relative">
                  <User className="h-4 w-4 text-gray-400 absolute top-3 left-3" />
                  <Input 
                    id="first-name" 
                    placeholder="John" 
                    required 
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors duration-200 border-gray-200 focus:border-blue-500"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                  Last name
                </label>
                <div className="relative">
                  <User className="h-4 w-4 text-gray-400 absolute top-3 left-3" />
                  <Input 
                    id="last-name" 
                    placeholder="Doe" 
                    required 
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors duration-200 border-gray-200 focus:border-blue-500"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-gray-400 absolute top-3 left-3" />
                <Input 
                  id="email" 
                  placeholder="john.doe@example.com" 
                  type="email" 
                  required 
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors duration-200 border-gray-200 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="relative">
                <Phone className="h-4 w-4 text-gray-400 absolute top-3 left-3" />
                <Input 
                  id="phone" 
                  placeholder="+1 (555) 123-4567" 
                  type="tel" 
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors duration-200 border-gray-200 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <label htmlFor="company" className="text-sm font-medium text-gray-700">
                Company
              </label>
              <div className="relative">
                <Briefcase className="h-4 w-4 text-gray-400 absolute top-3 left-3" />
                <Input 
                  id="company" 
                  placeholder="Acme Inc." 
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors duration-200 border-gray-200 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="relative">
                <MessageSquare className="h-4 w-4 text-gray-400 absolute top-3 left-3" />
                <Textarea 
                  id="message" 
                  placeholder="How can we help you?" 
                  rows={5} 
                  required 
                  className="pl-10 bg-gray-50 focus:bg-white transition-colors duration-200 border-gray-200 focus:border-blue-500 resize-none"
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full relative overflow-hidden group"
                disabled={isSubmitting}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-purple-700 transition-all duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <SendIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  )
}