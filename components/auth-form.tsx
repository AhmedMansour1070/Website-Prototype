// auth-form.tsx
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, User, Building, MapPin, Lock, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

// Use environment variable for API URL
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// Define form schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  companyAddress: z.string().min(5, { message: "Address must be at least 5 characters" }),
})

type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>

interface AuthFormProps {
  onSuccess: (userData: { name: string; email: string; companyName?: string; companyId?: number }) => void
  defaultTab?: "login" | "register"
}

// Helper function to calculate password strength
function calculatePasswordStrength(password: string): { label: string; color: string } {
  let score = 0
  if (password.length >= 6) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  if (score <= 2) return { label: "Weak", color: "text-red-600" }
  if (score <= 4) return { label: "Medium", color: "text-yellow-600" }
  return { label: "Strong", color: "text-green-600" }
}

export function AuthForm({ onSuccess, defaultTab = "login" }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      companyName: "",
      companyAddress: "",
    },
  })

  // Watch the password field to update the strength indicator
  const passwordValue = registerForm.watch("password")
  const strength = calculatePasswordStrength(passwordValue || "")

  async function onLoginSubmit(data: LoginFormValues) {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include",
      })

      const result = await response.json()
      if (!response.ok) {
        if (result.message === "Please verify your email before logging in.") {
          throw new Error("Your email is not verified. Please check your inbox.")
        }
        throw new Error(result.message || "Login failed. Please check your credentials.")
      }

      localStorage.setItem("token", result.token)
      localStorage.setItem("user", JSON.stringify(result.user))

      toast({
        title: "Login successful",
        description: "Welcome back to Fleet Management System!",
        duration: 3000,
      })

      onSuccess(result.user)
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  async function onRegisterSubmit(data: RegisterFormValues) {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          companyName: data.companyName,
          companyAddress: data.companyAddress,
        }),
        credentials: "include",
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || "Registration failed. Please try again.")
      }

      localStorage.setItem("token", result.token)
      localStorage.setItem("user", JSON.stringify(result.user))

      toast({
        title: "Registration successful",
        description: "Your account has been created! Check your email to verify your account.",
        duration: 3000,
      })

      // You might also want to redirect to a "verify email" page at this point.
      onSuccess(result.user)
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="login" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <motion.div variants={formVariants} initial="hidden" animate="visible">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input placeholder="email@example.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input type={showPassword ? "text" : "password"} placeholder="******" className="pl-10" {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full aspect-square text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button variant="link" className="text-xs text-blue-600 hover:text-blue-800 p-0 h-auto" type="button">
                    Forgot Password?
                  </Button>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loginForm.formState.isSubmitting}>
                  {loginForm.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </TabsContent>

        <TabsContent value="register">
          <motion.div variants={formVariants} initial="hidden" animate="visible">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input placeholder="John Doe" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input placeholder="email@example.com" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input type={showPassword ? "text" : "password"} placeholder="******" className="pl-10" {...field} />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full aspect-square text-gray-400 hover:text-gray-600"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                        {/* Password Strength Indicator */}
                        {passwordValue && (
                          <div className={`mt-1 text-sm ${strength.color}`}>
                            Password strength: {strength.label}
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input placeholder="Acme Inc." className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="companyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input placeholder="123 Main St, City, Country" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-2" disabled={registerForm.formState.isSubmitting}>
                  {registerForm.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm text-gray-500">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  )
}
