"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button, type ButtonProps } from "@/components/ui/button"
import { AuthForm } from "@/components/auth-form"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface AuthModalProps {
  triggerVariant?: ButtonProps["variant"]
  triggerText?: string
  defaultTab?: "login" | "register"
  className?: string
  useAvatar?: boolean
}

export function AuthModal({
  triggerVariant = "default",
  triggerText = "Login",
  defaultTab = "login",
  className,
  useAvatar = false,
}: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {useAvatar ? (
          <Avatar className={`cursor-pointer h-10 w-10 bg-blue-100 hover:bg-blue-200 transition-colors ${className}`}>
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <Button variant={triggerVariant} className={className}>
            {triggerText}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Authentication</SheetTitle>
          <SheetDescription>Login or create an account to access the dashboard.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <AuthForm
            defaultTab={defaultTab}
            onSuccess={(userData) => {
              setIsOpen(false)
              router.push("/dashboard")
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

