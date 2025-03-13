"use client"

import { useState, useEffect } from "react"
import { Users, Plus, CheckCircle2, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { PageHeader } from "@/components/dashboard/page-header"
import { SearchFilter } from "@/components/dashboard/search-filter"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"

// Mock data for drivers
const mockDrivers = [
  {
    id: 1,
    name: "John Doe",
    licenseNum: "DL12345678",
    licenseExpDate: "2025-06-15",
    age: 35,
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    avgSpeed: 65.5,
    experienceYears: 8,
    totalDistance: 125000,
    avgFuelEff: 8.2,
    totalAccidents: 0,
    totalViolations: 1,
    status: "active",
    assignedVehicle: "TR-1001",
  },
  {
    id: 2,
    name: "Jane Smith",
    licenseNum: "DL87654321",
    licenseExpDate: "2024-08-22",
    age: 42,
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Somewhere, USA",
    avgSpeed: 62.8,
    experienceYears: 12,
    totalDistance: 210000,
    avgFuelEff: 7.9,
    totalAccidents: 1,
    totalViolations: 0,
    status: "active",
    assignedVehicle: "TR-1002",
  },
  {
    id: 3,
    name: "Michael Johnson",
    licenseNum: "DL23456789",
    licenseExpDate: "2025-03-10",
    age: 29,
    phone: "+1 (555) 234-5678",
    address: "789 Pine Rd, Elsewhere, USA",
    avgSpeed: 68.2,
    experienceYears: 5,
    totalDistance: 85000,
    avgFuelEff: 8.5,
    totalAccidents: 0,
    totalViolations: 2,
    status: "active",
    assignedVehicle: "TR-1003",
  },
  {
    id: 4,
    name: "Sarah Williams",
    licenseNum: "DL34567890",
    licenseExpDate: "2024-05-18",
    age: 38,
    phone: "+1 (555) 345-6789",
    address: "101 Maple Dr, Nowhere, USA",
    avgSpeed: 63.7,
    experienceYears: 10,
    totalDistance: 175000,
    avgFuelEff: 8.0,
    totalAccidents: 0,
    totalViolations: 0,
    status: "active",
    assignedVehicle: "TR-1005",
  },
  {
    id: 5,
    name: "Robert Brown",
    licenseNum: "DL45678901",
    licenseExpDate: "2023-12-05",
    age: 45,
    phone: "+1 (555) 456-7890",
    address: "202 Cedar Ln, Anyplace, USA",
    avgSpeed: 61.9,
    experienceYears: 15,
    totalDistance: 280000,
    avgFuelEff: 7.7,
    totalAccidents: 2,
    totalViolations: 3,
    status: "inactive",
    assignedVehicle: "Unassigned",
  },
  {
    id: 6,
    name: "Emily Davis",
    licenseNum: "DL56789012",
    licenseExpDate: "2025-09-30",
    age: 32,
    phone: "+1 (555) 567-8901",
    address: "303 Birch Blvd, Someplace, USA",
    avgSpeed: 66.3,
    experienceYears: 7,
    totalDistance: 110000,
    avgFuelEff: 8.3,
    totalAccidents: 0,
    totalViolations: 1,
    status: "active",
    assignedVehicle: "TR-1007",
  },
  {
    id: 7,
    name: "David Wilson",
    licenseNum: "DL67890123",
    licenseExpDate: "2024-11-12",
    age: 40,
    phone: "+1 (555) 678-9012",
    address: "404 Elm St, Othertown, USA",
    avgSpeed: 64.1,
    experienceYears: 11,
    totalDistance: 195000,
    avgFuelEff: 7.8,
    totalAccidents: 1,
    totalViolations: 2,
    status: "inactive",
    assignedVehicle: "Unassigned",
  },
  {
    id: 8,
    name: "Jennifer Martinez",
    licenseNum: "DL78901234",
    licenseExpDate: "2025-01-25",
    age: 36,
    phone: "+1 (555) 789-0123",
    address: "505 Walnut Way, Anycity, USA",
    avgSpeed: 67.5,
    experienceYears: 9,
    totalDistance: 150000,
    avgFuelEff: 8.1,
    totalAccidents: 0,
    totalViolations: 0,
    status: "active",
    assignedVehicle: "Unassigned",
  },
]

export default function DriversPage() {
  const [drivers, setDrivers] = useState(mockDrivers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNum.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.assignedVehicle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const statsCards = [
    {
      title: "Total Drivers",
      value: drivers.length,
      icon: Users,
    },
    {
      title: "Active Drivers",
      value: drivers.filter((d) => d.status === "active").length,
      icon: CheckCircle2,
    },
    {
      title: "Assigned Drivers",
      value: drivers.filter((d) => d.assignedVehicle !== "Unassigned").length,
      icon: Users,
    },
    {
      title: "License Alerts",
      value: drivers.filter((d) => {
        const today = new Date()
        const expiration = new Date(d.licenseExpDate)
        const daysUntilExpiration = Math.ceil((expiration - today) / (1000 * 60 * 60 * 24))
        return daysUntilExpiration < 30
      }).length,
      icon: AlertTriangle,
    },
  ]

  const getLicenseStatus = (expDate) => {
    const today = new Date()
    const expiration = new Date(expDate)
    const daysUntilExpiration = Math.ceil((expiration - today) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiration < 0) {
      return "overdue"
    } else if (daysUntilExpiration < 30) {
      return "warning"
    } else {
      return "active"
    }
  }

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      header: "License #",
      accessorKey: "licenseNum",
    },
    {
      header: "License Status",
      accessorKey: "licenseExpDate",
      cell: (row) => (
        <StatusBadge
          status={getLicenseStatus(row.licenseExpDate)}
          label={
            getLicenseStatus(row.licenseExpDate) === "overdue"
              ? "Expired"
              : getLicenseStatus(row.licenseExpDate) === "warning"
                ? "Expiring Soon"
                : "Valid"
          }
        />
      ),
    },
    {
      header: "Experience",
      accessorKey: "experienceYears",
      cell: (row) => `${row.experienceYears} years`,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: "Assigned Vehicle",
      accessorKey: "assignedVehicle",
      cell: (row) =>
        row.assignedVehicle === "Unassigned" ? (
          <span className="text-muted-foreground">Unassigned</span>
        ) : (
          row.assignedVehicle
        ),
    },
  ]

  const actions = [
    {
      label: "View Profile",
      onClick: (row) => {
        toast({
          title: "View Profile",
          description: `Viewing profile for ${row.name}`,
        })
      },
    },
    {
      label: "Edit Driver",
      onClick: (row) => {
        toast({
          title: "Edit Driver",
          description: `Editing ${row.name}`,
        })
      },
    },
    {
      label: "Assign Vehicle",
      onClick: (row) => {
        toast({
          title: "Assign Vehicle",
          description: `Assigning vehicle to ${row.name}`,
        })
      },
    },
    {
      separator: true,
      label: "View Performance",
      onClick: (row) => {
        toast({
          title: "View Performance",
          description: `Viewing performance for ${row.name}`,
        })
      },
    },
    {
      separator: true,
      label: "Delete Driver",
      isDanger: true,
      onClick: (row) => {
        toast({
          title: "Delete Driver",
          description: `Deleting ${row.name}`,
          variant: "destructive",
        })
      },
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Drivers"
        action={{
          label: "Add Driver",
          icon: Plus,
          onClick: () => {
            toast({
              title: "Add Driver",
              description: "Opening add driver form",
            })
          },
        }}
      />

      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search drivers..."
        onFilterClick={() => {
          toast({
            title: "Filter",
            description: "Opening filter options",
          })
        }}
      />

      <StatsCards cards={statsCards} />

      <Card>
        <CardHeader>
          <CardTitle>Driver Management</CardTitle>
          <CardDescription>Manage your drivers and their assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredDrivers}
            actions={actions}
            isLoading={isLoading}
            emptyMessage="No drivers found"
          />
        </CardContent>
      </Card>
    </div>
  )
}

