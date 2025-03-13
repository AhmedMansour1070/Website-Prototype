import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  subtitle?: string
  trend?: {
    value: string
    positive?: boolean
  }
}

export function StatCard({ title, value, icon: Icon, subtitle, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        {trend && (
          <div className={`flex items-center text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}>
            {trend.positive ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-3 w-3">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-3 w-3">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface StatsCardsProps {
  cards: StatCardProps[]
}

export function StatsCards({ cards }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  )
}

