"use client"

import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface AdminStatProps {
  icon: LucideIcon
  label: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
}

const changeColors = {
  positive: "text-green-500",
  negative: "text-red-500",
  neutral: "text-foreground-muted",
}

export function AdminStat({ icon: Icon, label, value, change, changeType }: AdminStatProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-foreground-muted mb-1">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className={`text-xs ${changeColors[changeType]} mt-2`}>
            {changeType === "positive" ? "↑" : changeType === "negative" ? "↓" : "→"} {change} from last week
          </p>
        </div>
        <Icon className="h-8 w-8 text-primary opacity-20" />
      </div>
    </Card>
  )
}
