"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { AdminStat } from "@/components/admin-stats"
import { AdminTable } from "@/components/admin-table"
import { Users, MapPin, DollarSign, TrendingUp, Download, Filter } from "lucide-react"
import { useState } from "react"

export function AdminPage() {
  const [dateRange, setDateRange] = useState("week")

  const stats = [
    { label: "Total Revenue", value: "15.2M RWF", icon: DollarSign, change: "12.5%", changeType: "positive" as const },
    { label: "Active Users", value: "8,234", icon: Users, change: "8.2%", changeType: "positive" as const },
    { label: "Daily Trips", value: "312", icon: MapPin, change: "23.1%", changeType: "positive" as const },
    { label: "Bookings Today", value: "1,429", icon: TrendingUp, change: "5.4%", changeType: "positive" as const },
  ]

  const recentBookings = [
    { id: "BK001", route: "Kigali → Butare", amount: "5000 RWF", status: "confirmed" as const },
    { id: "BK002", route: "Kigali → Gisenyi", amount: "6500 RWF", status: "pending" as const },
    { id: "BK003", route: "Butare → Kigali", amount: "5000 RWF", status: "completed" as const },
    { id: "BK004", route: "Kigali → Musanze", amount: "5500 RWF", status: "confirmed" as const },
  ]

  const revenueByRoute = [
    { id: "RT001", route: "Kigali → Butare", amount: "2.3M RWF", status: "confirmed" as const },
    { id: "RT002", route: "Kigali → Gisenyi", amount: "3.1M RWF", status: "confirmed" as const },
    { id: "RT003", route: "Kigali → Musanze", amount: "1.8M RWF", status: "confirmed" as const },
  ]

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <PageHeader
        title="Admin Dashboard"
        description="Monitor platform performance and analytics"
        action={
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        }
      />

      {/* Date Range Filter */}
      <Card className="flex items-center gap-4">
        <Filter className="h-5 w-5 text-primary" />
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-foreground"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <AdminStat key={stat.label} {...stat} />
        ))}
      </div>

      {/* Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AdminTable title="Recent Bookings" rows={recentBookings} onAction={(id) => console.log("View booking:", id)} />
        <AdminTable
          title="Revenue by Route"
          rows={revenueByRoute}
          onAction={(id) => console.log("View route analytics:", id)}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" fullWidth>
            Manage Users
          </Button>
          <Button variant="outline" fullWidth>
            View Reports
          </Button>
          <Button variant="outline" fullWidth>
            Configure Routes
          </Button>
          <Button variant="outline" fullWidth>
            System Settings
          </Button>
        </div>
      </Card>
    </div>
  )
}
