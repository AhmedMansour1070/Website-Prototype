"use client"

import { Button } from "@/components/ui/button"
import { type LucideIcon, Plus } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    icon?: LucideIcon
    onClick?: () => void
  }
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  const ActionIcon = action?.icon || Plus

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Button onClick={action.onClick}>
          <ActionIcon className="mr-2 h-4 w-4" /> {action.label}
        </Button>
      )}
    </div>
  )
}

