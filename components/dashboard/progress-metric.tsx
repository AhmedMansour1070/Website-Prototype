interface ProgressMetricProps {
  label: string
  value: number
  target?: number
  max?: number
  unit?: string
  showPercentage?: boolean
}

export function ProgressMetric({
  label,
  value,
  target,
  max = 100,
  unit = "",
  showPercentage = true,
}: ProgressMetricProps) {
  const percentage = target ? (value / target) * 100 : (value / max) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">{label}</h4>
        <span className="text-sm font-medium">
          {value}
          {unit} {target && `/ ${target}${unit}`}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>
      {showPercentage && target && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Target: {target}
            {unit}
          </span>
          <span>{Math.round(percentage)}% of target</span>
        </div>
      )}
    </div>
  )
}

interface ProgressMetricsProps {
  metrics: ProgressMetricProps[]
}

export function ProgressMetrics({ metrics }: ProgressMetricsProps) {
  return (
    <div className="space-y-8">
      {metrics.map((metric, index) => (
        <ProgressMetric key={index} {...metric} />
      ))}
    </div>
  )
}

