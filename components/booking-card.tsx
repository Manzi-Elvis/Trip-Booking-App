"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Ticket, Download } from "lucide-react"

interface BookingCardProps {
  id: string
  bookingNumber: string
  from: string
  to: string
  date: string
  departure: string
  price: string
  status: "confirmed" | "pending" | "cancelled"
  onCancel?: () => void
  onDownload?: () => void
}

const statusColors = {
  confirmed: "bg-green-500/10 text-green-700 dark:text-green-400",
  pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  cancelled: "bg-red-500/10 text-red-700 dark:text-red-400",
}

export function BookingCard({
  id,
  bookingNumber,
  from,
  to,
  date,
  departure,
  price,
  status,
  onCancel,
  onDownload,
}: BookingCardProps) {
  return (
    <Card className="flex flex-col">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">Booking #{bookingNumber}</h3>
          <p className="text-xs sm:text-sm text-foreground-muted truncate">ID: {id}</p>
        </div>
        <div className="shrink-0">
          <Badge className={statusColors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
        </div>
      </div>

      <div className="space-y-2 mb-4 sm:space-y-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
          <span className="truncate">
            {from} → {to}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Calendar className="h-4 w-4 flex-shrink-0 text-primary" />
          <span className="truncate">
            {date} at {departure}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Ticket className="h-4 w-4 flex-shrink-0 text-primary" />
          <span>Price: {price}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-border sm:flex-row">
        <Button onClick={onDownload} variant="outline" className="w-full sm:flex-1 bg-transparent" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Ticket
        </Button>
        {status === "confirmed" && (
          <Button onClick={onCancel} variant="outline" className="w-full sm:flex-1 bg-transparent" size="sm">
            Cancel
          </Button>
        )}
      </div>
    </Card>
  )
}
