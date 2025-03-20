"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Settings, Users, Building, Shield, Database, Globe, Moon, Sun, Laptop, Plus } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DemoBadge } from "@/components/demo-dashboard/demo-badge"

export default function SettingsPage() {
  const [theme, setTheme] = useState("system")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
        duration: 3000,
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-black font-bold">Settings</h1>
        <DemoBadge />
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building className="mr-2 h-4 w-4" /> Company
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Appearance</h3>
                <div className="grid gap-2">
                  <Label>Theme</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      className="w-24"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="mr-2 h-4 w-4" /> Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      className="w-24"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="mr-2 h-4 w-4" /> Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      size="sm"
                      className="w-24"
                      onClick={() => setTheme("system")}
                    >
                      <Laptop className="mr-2 h-4 w-4" /> System
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language & Region</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc-5">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-format">Time Format</Label>
                    <Select defaultValue="12h">
                      <SelectTrigger id="time-format">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Units</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance</Label>
                    <Select defaultValue="km">
                      <SelectTrigger id="distance">
                        <SelectValue placeholder="Select distance unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="km">Kilometers (km)</SelectItem>
                        <SelectItem value="mi">Miles (mi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuel-efficiency">Fuel Efficiency</Label>
                    <Select defaultValue="kml">
                      <SelectTrigger id="fuel-efficiency">
                        <SelectValue placeholder="Select fuel efficiency unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kml">Kilometers per Liter (km/L)</SelectItem>
                        <SelectItem value="mpg">Miles per Gallon (MPG)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Select defaultValue="kg">
                      <SelectTrigger id="weight">
                        <SelectValue placeholder="Select weight unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="lb">Pounds (lb)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume</Label>
                    <Select defaultValue="l">
                      <SelectTrigger id="volume">
                        <SelectValue placeholder="Select volume unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="l">Liters (L)</SelectItem>
                        <SelectItem value="gal">Gallons (gal)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage your data settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-backup">Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup your data on a regular schedule
                    </p>
                  </div>
                  <Switch id="auto-backup" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-export">Data Export</Label>
                    <p className="text-sm text-muted-foreground">Allow exporting data to CSV and Excel formats</p>
                  </div>
                  <Switch id="data-export" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-retention">Data Retention</Label>
                    <p className="text-sm text-muted-foreground">Keep historical data for analysis and reporting</p>
                  </div>
                  <Select defaultValue="1y">
                    <SelectTrigger id="data-retention" className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3m">3 months</SelectItem>
                      <SelectItem value="6m">6 months</SelectItem>
                      <SelectItem value="1y">1 year</SelectItem>
                      <SelectItem value="2y">2 years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  <Database className="mr-2 h-4 w-4" /> Backup Now
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">User Roles</h3>
                <Button size="sm">
                  <Users className="mr-2 h-4 w-4" /> Add User
                </Button>
              </div>

              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <Separator />
                  {[
                    { name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
                    { name: "Jane Smith", email: "jane.smith@example.com", role: "Manager", status: "Active" },
                    {
                      name: "Michael Johnson",
                      email: "michael.johnson@example.com",
                      role: "Dispatcher",
                      status: "Active",
                    },
                    { name: "Sarah Williams", email: "sarah.williams@example.com", role: "Viewer", status: "Inactive" },
                  ].map((user, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div>{user.name}</div>
                      <div className="text-muted-foreground">{user.email}</div>
                      <div>
                        <Select defaultValue={user.role.toLowerCase()}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="dispatcher">Dispatcher</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Switch defaultChecked={user.status === "Active"} />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Role Permissions</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Permission</div>
                    <div>Admin</div>
                    <div>Manager</div>
                    <div>Dispatcher</div>
                    <div>Viewer</div>
                  </div>
                  <Separator />
                  {[
                    { name: "View Dashboard" },
                    { name: "Manage Vehicles" },
                    { name: "Manage Drivers" },
                    { name: "Manage Trips" },
                    { name: "Manage Maintenance" },
                    { name: "View Reports" },
                    { name: "Export Data" },
                    { name: "Manage Users" },
                    { name: "System Settings" },
                  ].map((permission, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div>{permission.name}</div>
                      <div className="text-center">
                        <Switch defaultChecked disabled />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked={!["Manage Users", "System Settings"].includes(permission.name)} />
                      </div>
                      <div className="text-center">
                        <Switch
                          defaultChecked={["View Dashboard", "Manage Trips", "View Reports"].includes(permission.name)}
                        />
                      </div>
                      <div className="text-center">
                        <Switch defaultChecked={["View Dashboard", "View Reports"].includes(permission.name)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>Manage your company settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="FleetMaster Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-logo">Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md border flex items-center justify-center">
                      <Building className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline">Upload Logo</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="transportation">
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-size">Company Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="company-size">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-50 employees)</SelectItem>
                      <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                      <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="business-hours">Business Hours</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="start-time" className="w-24">
                      Start Time
                    </Label>
                    <Input id="start-time" type="time" defaultValue="09:00" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="end-time" className="w-24">
                      End Time
                    </Label>
                    <Input id="end-time" type="time" defaultValue="17:00" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox id={`day-${index}`} defaultChecked={index < 5} />
                      <Label htmlFor={`day-${index}`}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Locations</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                    <div>Name</div>
                    <div>Address</div>
                    <div>Type</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <Separator />
                  {[
                    { name: "Main Depot", address: "123 Main St, Anytown, USA", type: "Headquarters" },
                    { name: "North Depot", address: "456 North Ave, Othertown, USA", type: "Depot" },
                    { name: "South Depot", address: "789 South Blvd, Somewhere, USA", type: "Depot" },
                  ].map((location, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 items-center">
                      <div>{location.name}</div>
                      <div className="text-muted-foreground">{location.address}</div>
                      <div>{location.type}</div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Location
                </Button>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your security and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require two-factor authentication for all users</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="password-expiry">Password Expiry</Label>
                      <p className="text-sm text-muted-foreground">Force password reset after a certain period</p>
                    </div>
                    <Select defaultValue="90d">
                      <SelectTrigger id="password-expiry" className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30d">30 days</SelectItem>
                        <SelectItem value="60d">60 days</SelectItem>
                        <SelectItem value="90d">90 days</SelectItem>
                        <SelectItem value="180d">180 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                    </div>
                    <Select defaultValue="30m">
                      <SelectTrigger id="session-timeout" className="w-[180px]">
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15m">15 minutes</SelectItem>
                        <SelectItem value="30m">30 minutes</SelectItem>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="4h">4 hours</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password Policy</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="min-length">Minimum Length</Label>
                    <Select defaultValue="8">
                      <SelectTrigger id="min-length" className="w-[180px]">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 characters</SelectItem>
                        <SelectItem value="8">8 characters</SelectItem>
                        <SelectItem value="10">10 characters</SelectItem>
                        <SelectItem value="12">12 characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="require-uppercase">Require Uppercase</Label>
                      <p className="text-sm text-muted-foreground">Require at least one uppercase letter</p>
                    </div>
                    <Switch id="require-uppercase" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="require-number">Require Number</Label>
                      <p className="text-sm text-muted-foreground">Require at least one number</p>
                    </div>
                    <Switch id="require-number" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="require-special">Require Special Character</Label>
                      <p className="text-sm text-muted-foreground">Require at least one special character</p>
                    </div>
                    <Switch id="require-special" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Access</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-api">Enable API Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow external applications to access your data via API
                      </p>
                    </div>
                    <Switch id="enable-api" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-key-expiry">API Key Expiry</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically expire API keys after a certain period
                      </p>
                    </div>
                    <Select defaultValue="90d">
                      <SelectTrigger id="api-key-expiry" className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30d">30 days</SelectItem>
                        <SelectItem value="90d">90 days</SelectItem>
                        <SelectItem value="180d">180 days</SelectItem>
                        <SelectItem value="365d">1 year</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Globe className="mr-2 h-4 w-4" /> Manage API Keys
                </Button>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

