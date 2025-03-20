"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Search, Download, Check, X, AlertTriangle, Settings, Zap, Map, BarChart2, Calendar, Truck } from "lucide-react"
import { DemoBadge } from "@/components/demo-dashboard/demo-badge"

const plugins = [
  {
    id: "route-optimizer",
    name: "Route Optimizer",
    description: "Optimize routes for your fleet to save time and fuel",
    icon: Map,
    installed: true,
    version: "2.3.1",
    author: "FleetMaster",
    category: "routing",
  },
  {
    id: "fuel-tracker",
    name: "Fuel Tracker Pro",
    description: "Advanced fuel consumption tracking and analytics",
    icon: Zap,
    installed: true,
    version: "1.5.0",
    author: "EcoFleet Solutions",
    category: "analytics",
  },
  {
    id: "maintenance-scheduler",
    name: "Maintenance Scheduler",
    description: "Automated maintenance scheduling and reminders",
    icon: Calendar,
    installed: true,
    version: "3.0.2",
    author: "FleetMaster",
    category: "maintenance",
  },
  {
    id: "driver-performance",
    name: "Driver Performance Analytics",
    description: "Advanced driver behavior and performance metrics",
    icon: BarChart2,
    installed: false,
    version: "2.1.0",
    author: "FleetMetrics Inc.",
    category: "analytics",
  },
  {
    id: "vehicle-diagnostics",
    name: "Vehicle Diagnostics",
    description: "Real-time vehicle diagnostics and OBD integration",
    icon: Truck,
    installed: false,
    version: "1.8.3",
    author: "AutoTech Solutions",
    category: "maintenance",
  },
]

export default function PluginsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const filteredPlugins = plugins.filter(
    (plugin) =>
      (activeTab === "all" ||
        (activeTab === "installed" && plugin.installed) ||
        (activeTab === "available" && !plugin.installed) ||
        activeTab === plugin.category) &&
      (plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plugin.author.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleInstall = (pluginId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Plugin installed",
        description: "The plugin has been installed successfully.",
        duration: 3000,
      })
    }, 1500)
  }

  const handleUninstall = (pluginId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Plugin uninstalled",
        description: "The plugin has been uninstalled successfully.",
        duration: 3000,
      })
    }, 1500)
  }

  const handleConfigure = (pluginId: string) => {
    toast({
      title: "Plugin configuration",
      description: "Opening configuration for " + plugins.find((p) => p.id === pluginId)?.name,
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Plugins</h1>
        <DemoBadge />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search plugins..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Install Plugin
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="installed">Installed</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="routing">Routing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredPlugins.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No plugins found</p>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlugins.map((plugin) => (
                <Card key={plugin.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <plugin.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{plugin.name}</CardTitle>
                      </div>
                      {plugin.installed ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Check className="mr-1 h-3 w-3" /> Installed
                        </Badge>
                      ) : (
                        <Badge variant="outline">Available</Badge>
                      )}
                    </div>
                    <CardDescription>{plugin.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-1">Version:</span>
                        <span>{plugin.version}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-1">By:</span>
                        <span>{plugin.author}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    {plugin.installed ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleConfigure(plugin.id)}>
                          <Settings className="mr-2 h-4 w-4" /> Configure
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleUninstall(plugin.id)}
                          disabled={isLoading}
                        >
                          <X className="mr-2 h-4 w-4" /> {isLoading ? "Uninstalling..." : "Uninstall"}
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full" onClick={() => handleInstall(plugin.id)} disabled={isLoading}>
                        <Download className="mr-2 h-4 w-4" /> {isLoading ? "Installing..." : "Install"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Plugin Settings</CardTitle>
          <CardDescription>Configure global plugin settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Auto-Update Plugins</h4>
              <p className="text-sm text-muted-foreground">
                Automatically update plugins when new versions are available
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Plugin Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Receive notifications about plugin updates and new features
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Developer Mode</h4>
              <p className="text-sm text-muted-foreground">
                Enable advanced features for plugin development and testing
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

