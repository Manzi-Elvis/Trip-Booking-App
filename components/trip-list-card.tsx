"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Bus } from "lucide-react"
import Link from "next/link"
import type { Trip } from "@/lib/api-types"

interface TripListCardProps extends Trip {
  onSelect?: (tripId: string) => void
}

export function TripListCard({
  id,
  from,
  to,
  departureTime,
  arrivalTime,
  duration,
  price,
  availableSeats,
  busCompany,
}: TripListCardProps) {
  return (
    <Link href={`/trips/${id}`}>
      <Card className="hover:border-primary transition-colors cursor-pointer h-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Route & Times */}
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {departureTime.split(":")[0]}:{departureTime.split(":")[1]}
                </p>
                <p className="text-xs text-foreground-muted">{from}</p>
              </div>

              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="flex-1 h-px bg-border"></div>
                  <Clock className="w-4 h-4 text-foreground-muted" />
                  <div className="flex-1 h-px bg-border"></div>
                </div>
                <p className="text-xs font-semibold text-foreground-muted">{duration}</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {arrivalTime.split(":")[0]}:{arrivalTime.split(":")[1]}
                </p>
                <p className="text-xs text-foreground-muted">{to}</p>
              </div>
            </div>
          </div>

          {/* Company & Price */}
          <div className="md:text-right flex flex-col md:flex-col gap-2 md:gap-1">
            <div className="flex items-center gap-1 text-foreground-muted">
              <Bus className="w-4 h-4" />
              <span className="text-sm font-medium">{busCompany}</span>
            </div>
            <div className="flex items-center gap-1 text-foreground-muted">
              <Users className="w-4 h-4" />
              <span className="text-sm">{availableSeats} seats</span>
            </div>
            <p className="text-xl font-bold text-primary">{price.toLocaleString()} RWF</p>
          </div>

          {/* CTA Button */}
          <div className="md:ml-4">
            <Button className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white">Select</Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
