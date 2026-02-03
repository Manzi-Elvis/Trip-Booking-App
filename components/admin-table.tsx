"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TableRow {
  id: string
  route: string
  amount: string
  status: "confirmed" | "pending" | "completed"
}

interface AdminTableProps {
  title: string
  rows: TableRow[]
  onAction?: (id: string) => void
}

const statusColors = {
  confirmed: "bg-green-500/10 text-green-700 dark:text-green-400",
  pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  completed: "bg-foreground-muted/10 text-foreground-muted",
}

export function AdminTable({ title, rows, onAction }: AdminTableProps) {
  return (
    <Card>
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-foreground-muted font-medium">ID</th>
              <th className="text-left py-2 px-2 text-foreground-muted font-medium">Route</th>
              <th className="text-left py-2 px-2 text-foreground-muted font-medium">Amount</th>
              <th className="text-left py-2 px-2 text-foreground-muted font-medium">Status</th>
              <th className="text-left py-2 px-2 text-foreground-muted font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border hover:bg-surface-light transition-colors">
                <td className="py-3 px-2 font-mono text-primary">{row.id}</td>
                <td className="py-3 px-2">{row.route}</td>
                <td className="py-3 px-2 font-semibold">{row.amount}</td>
                <td className="py-3 px-2">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[row.status]}`}>
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <Button onClick={() => onAction?.(row.id)} variant="outline" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
