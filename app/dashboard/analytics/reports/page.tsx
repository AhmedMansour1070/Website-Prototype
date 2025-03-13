"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, BarChart2, PieChart, TrendingUp, Printer, Mail } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("fleet")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
            <span className="sr-only">Print</span>
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>Select parameters to generate a custom report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select defaultValue={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fleet">Fleet Overview</SelectItem>
                  <SelectItem value="vehicle">Vehicle Performance</SelectItem>
                  <SelectItem value="driver">Driver Performance</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="fuel">Fuel Consumption</SelectItem>
                  <SelectItem value="cost">Cost Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <DatePickerWithRange className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">Generate Report</Button>
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <h3 className="text-sm font-medium mb-3">Include in Report:</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="charts" defaultChecked />
                <Label htmlFor="charts">Charts & Graphs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tables" defaultChecked />
                <Label htmlFor="tables">Data Tables</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="summary" defaultChecked />
                <Label htmlFor="summary">Executive Summary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="recommendations" defaultChecked />
                <Label htmlFor="recommendations">Recommendations</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="saved" className="space-y-4">
        <TabsList>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Monthly Fleet Overview", date: "Dec 1, 2023", type: "Fleet Overview", icon: BarChart2 },
              { title: "Driver Performance Q4", date: "Nov 15, 2023", type: "Driver Performance", icon: TrendingUp },
              { title: "Maintenance Cost Analysis", date: "Nov 10, 2023", type: "Cost Analysis", icon: PieChart },
              { title: "Fuel Efficiency Report", date: "Nov 5, 2023", type: "Fuel Consumption", icon: BarChart2 },
              { title: "Vehicle Utilization", date: "Oct 28, 2023", type: "Vehicle Performance", icon: TrendingUp },
              { title: "Annual Fleet Report 2023", date: "Oct 15, 2023", type: "Fleet Overview", icon: FileText },
            ].map((report, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-700">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <report.icon className="h-16 w-16 opacity-20" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.type}</p>
                      <p className="text-xs text-muted-foreground mt-1">Generated: {report.date}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Reports that are generated automatically</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Weekly Fleet Status",
                    frequency: "Every Monday at 8:00 AM",
                    recipients: "Fleet Managers",
                    type: "Fleet Overview",
                  },
                  {
                    title: "Monthly Performance Summary",
                    frequency: "1st of every month at 9:00 AM",
                    recipients: "Executive Team",
                    type: "Performance",
                  },
                  {
                    title: "Maintenance Schedule",
                    frequency: "Every Friday at 3:00 PM",
                    recipients: "Maintenance Team",
                    type: "Maintenance",
                  },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.type}</p>
                      <p className="text-xs text-muted-foreground mt-1">Schedule: {report.frequency}</p>
                      <p className="text-xs text-muted-foreground">Recipients: {report.recipients}</p>
                    </div>
                    <div className="flex space-x-2">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Fleet Overview", description: "Complete overview of fleet status and performance" },
              { title: "Driver Performance", description: "Detailed analysis of driver metrics and KPIs" },
              { title: "Vehicle Performance", description: "In-depth vehicle performance and utilization" },
              { title: "Maintenance Report", description: "Maintenance history, costs, and upcoming schedule" },
              { title: "Fuel Consumption", description: "Fuel usage patterns and efficiency metrics" },
              { title: "Cost Analysis", description: "Breakdown of operational costs and trends" },
            ].map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Use Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Report Preview</CardTitle>
          <CardDescription>Preview of the selected report type</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-[500px] w-full">
            <Image
              src={`/images/${reportType}-report.jpg`}
              alt="Report Preview"
              fill
              className="object-cover rounded-b-lg"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-b-lg">
              <Button>Generate Full Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

