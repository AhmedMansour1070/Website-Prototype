"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
          Send us a message
        </CardTitle>
        <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="first-name" className="text-sm font-medium">
                First name
              </label>
              <Input id="first-name" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="last-name" className="text-sm font-medium">
                Last name
              </label>
              <Input id="last-name" placeholder="Doe" required />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" placeholder="john.doe@example.com" type="email" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <Input id="phone" placeholder="+1 (555) 123-4567" type="tel" />
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium">
              Company
            </label>
            <Input id="company" placeholder="Acme Inc." />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea id="message" placeholder="How can we help you?" rows={5} required />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

