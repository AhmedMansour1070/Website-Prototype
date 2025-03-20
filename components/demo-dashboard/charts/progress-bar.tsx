interface ProgressBarProps {
  value: number
  max: number
  color?: string
  height?: string
  showLabel?: boolean
  label?: string
}

export function ProgressBar({
  value,
  max,
  color = "#3b82f6",
  height = "h-2",
  showLabel = false,
  label,
}: ProgressBarProps) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-1">
      {showLabel && label && (
        <div className="flex justify-between text-xs">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${height}`}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}

