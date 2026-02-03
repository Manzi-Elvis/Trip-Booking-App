"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"
import { dummyTrips } from "@/lib/dummy-data"
import { Clock, MapPin, Users, Bus, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

export default function TripDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const tripId = params.id as string

  const trip = dummyTrips.find((t) => t.id === tripId) || dummyTrips[0]

  const handleSelectTrip = () => {
    // Navigate to seat selection page
    router.push(`/trips/${tripId}/select-seats`)
    toast.success("Proceeding to seat selection...")
  }

  return (
    <div className="p-4 lg:p-8 max-w-2xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Trips
      </button>

      {/* Trip Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          {trip.from} → {trip.to}
        </h1>
        <p className="text-primary-light">{trip.departureTime}</p>
      </div>

      {/* Trip Details */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-foreground-muted">Duration</p>
              <p className="text-2xl font-bold text-foreground">{trip.duration}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-foreground-muted">Departure</p>
              <p className="text-2xl font-bold text-foreground">{trip.departureTime}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-foreground-muted">Available Seats</p>
              <p className="text-2xl font-bold text-foreground">
                {trip.availableSeats}/{trip.totalSeats}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <Bus className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-foreground-muted">Bus Company</p>
              <p className="text-2xl font-bold text-foreground">{trip.busCompany}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Price Section */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground-muted mb-1">Price per seat</p>
            <p className="text-4xl font-bold text-primary">{trip.price.toLocaleString()} RWF</p>
          </div>
          <Button
            onClick={handleSelectTrip}
            className="bg-primary hover:bg-primary-dark text-white px-8"
            disabled={trip.availableSeats === 0}
          >
            {trip.availableSeats > 0 ? "Select Seats" : "Sold Out"}
          </Button>
        </div>
      </Card>

      {/* Amenities */}
      <Card>
        <h2 className="text-lg font-bold mb-4 text-foreground">Bus Amenities</h2>
        <div className="grid grid-cols-2 gap-4">
          {["WiFi", "Air Conditioning", "USB Charging", "Comfortable Seats", "Restroom", "Snacks Available"].map(
            (amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary"></div>
                <span className="text-foreground">{amenity}</span>
              </div>
            ),
          )}
        </div>
      </Card>
    </div>
  )
}
