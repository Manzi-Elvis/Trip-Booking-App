"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, ArrowRight } from "lucide-react"

interface TripCardProps {
  id: number
  from: string
  to: string
  departure: string
  duration: string
  price: string
  available: number
  onBook?: () => void
}

export function TripCard({ id, from, to, departure, duration, price, available, onBook }: TripCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:border-primary transition-colors">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-foreground-muted">
            <MapPin className="h-4 w-4" />
            <span className="font-medium">
              {from} to {to}
            </span>
          </div>
          <Badge variant={available > 10 ? "default" : "secondary"}>{available} seats</Badge>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-muted">Departure</span>
            <span className="font-medium">{departure}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-foreground-muted">
              <Clock className="h-4 w-4" />
              Duration
            </div>
            <span className="font-medium">{duration}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="text-lg font-bold text-primary">{price}</span>
            <span className="text-xs text-foreground-muted">per person</span>
          </div>
        </div>
      </div>
      <Button onClick={onBook} fullWidth className="mt-4">
        Book Now
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  )
}
