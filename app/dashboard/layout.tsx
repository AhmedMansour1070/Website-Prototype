"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Copy, Settings } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const tabs = [
  { label: "Vehicles", href: "/dashboard/vehicles" },
  { label: "Tenants", href: "/dashboard/tenants" },
  { label: "Rentals", href: "/dashboard/trips" },
  { label: "Handover protocols", href: "/dashboard/maintenance" },
  { label: "Repairs", href: "/dashboard/repairs" },
  { label: "Appointments", href: "/dashboard/appointments" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Fleet Management</h1>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="ghost" size="sm" className="text-white">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white">
                <Settings className="mr-2 h-4 w-4" />
                Plugins
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/images/avatar-1.jpg" alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("token")
                      localStorage.removeItem("user")
                      router.push("/")
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Navigation */}
      <nav className="bg-gray-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 h-12">
            {tabs.map((tab) => (
              <Button
                key={tab.href}
                variant="ghost"
                className="text-white hover:bg-gray-600"
                onClick={() => router.push(tab.href)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

