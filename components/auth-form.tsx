"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

// Define the form schemas
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
  onSuccess: (userData: { name: string; email: string }) => void
  defaultTab?: "login" | "register"
}

export function AuthForm({ onSuccess, defaultTab = "login" }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(defaultTab === "login")
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

  async function onLoginSubmit(data: LoginFormValues) {
    try {
      // For demo purposes, we'll simulate a successful login
      // In a real app, you would make an API call here

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData = {
        name: "Demo User",
        email: data.email,
        companyName: "Demo Company",
        companyId: 1,
      }

      // Store token and user data
      localStorage.setItem("token", "demo-token")
      localStorage.setItem("user", JSON.stringify(userData))

      toast({
        title: "Login successful",
        description: "Welcome back to Fleet Management System!",
        duration: 3000,
      })

      onSuccess(userData)
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
      // For demo purposes, we'll simulate a successful registration
      // In a real app, you would make an API call here

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData = {
        name: data.name,
        email: data.email,
        companyName: data.companyName,
        companyId: 1,
      }

      // Store token and user data
      localStorage.setItem("token", "demo-token")
      localStorage.setItem("user", JSON.stringify(userData))

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully!",
        duration: 3000,
      })

      onSuccess(userData)
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  return (
    <div className="space-y-6">
      {isLogin ? (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
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
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
              {loginForm.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
            <FormField
              control={registerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input placeholder="email@example.com" {...field} />
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
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="Acme Inc." {...field} />
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
                    <Input placeholder="123 Main St, City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={registerForm.formState.isSubmitting}>
              {registerForm.formState.isSubmitting ? "Creating account..." : "Register"}
            </Button>
          </form>
        </Form>
      )}

      <div className="text-center">
        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-brand-600 hover:text-brand-800"
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </Button>
      </div>
    </div>
  )
}

