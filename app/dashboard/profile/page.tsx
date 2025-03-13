"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Building, User, Shield, Bell, Key, LogOut } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string; companyName: string; companyId: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user")

    if (userData) {
      setUser(JSON.parse(userData))
    }

    setIsLoading(false)
  }, [])

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
      duration: 3000,
    })
  }

  const handleSavePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
      duration: 3000,
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been saved.",
      duration: 3000,
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <p className="text-muted-foreground mb-6">Please log in to view your profile.</p>
        <Button>Go to Login</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/images/avatar-1.jpg" alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">
              <Badge variant="outline" className="mr-2">
                Admin
              </Badge>
              {user.companyName}
            </p>
          </div>
        </div>
        <Button variant="outline" className="md:self-end">
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="password">
            <Key className="mr-2 h-4 w-4" /> Password
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building className="mr-2 h-4 w-4" /> Company
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" defaultValue="Fleet Manager" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us about yourself"
                  defaultValue="Experienced fleet manager with over 10 years in the transportation industry."
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSavePassword}>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Enhance your account security by enabling two-factor authentication.
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Recovery Codes</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate recovery codes to access your account if you lose your two-factor authentication device.
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Generate Codes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-alerts">System Alerts</Label>
                    <Switch id="email-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-maintenance">Maintenance Reminders</Label>
                    <Switch id="email-maintenance" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-reports">Weekly Reports</Label>
                    <Switch id="email-reports" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-news">News and Updates</Label>
                    <Switch id="email-news" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-alerts">System Alerts</Label>
                    <Switch id="push-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-maintenance">Maintenance Reminders</Label>
                    <Switch id="push-maintenance" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-reports">Weekly Reports</Label>
                    <Switch id="push-reports" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>View and update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue={user.companyName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-id">Company ID</Label>
                  <Input id="company-id" defaultValue={user.companyId} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Input id="company-address" defaultValue="123 Fleet Street, Business District, City, 12345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone</Label>
                  <Input id="company-phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input id="company-email" type="email" defaultValue="info@acmeinc.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Website</Label>
                  <Input id="company-website" type="url" defaultValue="https://acmeinc.com" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="company-description">Company Description</Label>
                <textarea
                  id="company-description"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Acme Inc. is a leading transportation and logistics company specializing in efficient fleet management solutions."
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    toast({
                      title: "Company information updated",
                      description: "Your company information has been updated successfully.",
                      duration: 3000,
                    })
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription & Billing</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Current Plan</h4>
                  <p className="text-sm text-muted-foreground">Enterprise Plan</p>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Plan Features</h4>
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-green-600" />
                    Unlimited vehicles
                  </li>
                  <li className="flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-green-600" />
                    Unlimited drivers
                  </li>
                  <li className="flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-green-600" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-green-600" />
                    24/7 support
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Billing Information</h4>
                  <p className="text-sm text-muted-foreground">Next billing date: January 1, 2024</p>
                </div>
                <Button variant="outline">View Invoices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

