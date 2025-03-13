import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2, Clock, Calendar } from "lucide-react"

type StatusType =
  | "completed"
  | "in_progress"
  | "scheduled"
  | "active"
  | "inactive"
  | "maintenance"
  | "overdue"
  | "warning"
  | "critical"
  | "info"

interface StatusBadgeProps {
  status: StatusType
  label?: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle2,
          className: "bg-green-100 text-green-800 hover:bg-green-100",
          label: label || "Completed",
        }
      case "in_progress":
        return {
          icon: Clock,
          className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
          label: label || "In Progress",
        }
      case "scheduled":
        return {
          icon: Calendar,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
          label: label || "Scheduled",
        }
      case "active":
        return {
          icon: CheckCircle2,
          className: "bg-green-100 text-green-800 hover:bg-green-100",
          label: label || "Active",
        }
      case "inactive":
        return {
          icon: Clock,
          className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
          label: label || "Inactive",
        }
      case "maintenance":
        return {
          icon: AlertTriangle,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
          label: label || "Maintenance",
        }
      case "overdue":
        return {
          icon: AlertTriangle,
          className: "bg-red-100 text-red-800 hover:bg-red-100",
          label: label || "Overdue",
        }
      case "warning":
        return {
          icon: AlertTriangle,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
          label: label || "Warning",
        }
      case "critical":
        return {
          icon: AlertTriangle,
          className: "bg-red-100 text-red-800 hover:bg-red-100",
          label: label || "Critical",
        }
      case "info":
        return {
          icon: CheckCircle2,
          className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
          label: label || "Info",
        }
      default:
        return {
          icon: CheckCircle2,
          className: "",
          label: label || "Unknown",
        }
    }
  }

  const { icon: Icon, className, label: badgeLabel } = getStatusConfig(status)

  return (
    <Badge variant="outline" className={className}>
      <Icon className="mr-1 h-3 w-3" /> {badgeLabel}
    </Badge>
  )
}

