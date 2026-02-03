"use client"

import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  icon?: LucideIcon
  value: string
  label: string
  trend?: number
  color?: "primary" | "success" | "warning" | "error"
}

const colorClasses = {
  primary: "text-primary",
  success: "text-green-500",
  warning: "text-yellow-500",
  error: "text-red-500",
}

export function StatsCard({ icon: Icon, value, label, trend, color = "primary" }: StatsCardProps) {
  return (
    <Card className="text-center">
      {Icon && <Icon className={`h-8 w-8 mx-auto mb-2 ${colorClasses[color]}`} />}
      <div className={`text-3xl font-bold ${colorClasses[color]} mb-2`}>{value}</div>
      <p className="text-foreground-muted text-sm">{label}</p>
      {trend !== undefined && (
        <p className={`text-xs mt-2 ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
        </p>
      )}
    </Card>
  )
}
