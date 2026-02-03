"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SeatGrid } from "@/components/seat-grid"
import { PaymentMethods } from "@/components/payment-methods"
import { useParams, useRouter } from "next/navigation"
import { dummyTrips } from "@/lib/dummy-data"
import { generateSeatGrid } from "@/lib/dummy-data"
import { useState } from "react"
import { toast } from "sonner"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { useCreateBooking } from "@/lib/api-hooks"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SelectSeatsPage() {
  const params = useParams()
  const router = useRouter()
  const tripId = params.id as string

  const trip = dummyTrips.find((t) => t.id === tripId) || dummyTrips[0]

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [paymentMethod, setPaymentMethod] = useState("mtn")
  const [passengerName, setPassengerName] = useState("")
  const [passengerPhone, setPassengerPhone] = useState("")

  const createBookingMutation = useCreateBooking()

  const seats = generateSeatGrid(trip.totalSeats, ["A1", "B3", "C2", "D4"], selectedSeats)

  const totalPrice = selectedSeats.length * trip.price

  const handleSelectSeat = (seatId: string) => {
    setSelectedSeats((prev) => (prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]))
  }

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat")
      return
    }

    if (!passengerName.trim()) {
      toast.error("Please enter your name")
      return
    }

    if (!passengerPhone.trim()) {
      toast.error("Please enter your phone number")
      return
    }

    createBookingMutation.mutate(
      {
        tripId: trip.id,
        seats: selectedSeats,
        paymentMethod: paymentMethod as any,
        totalPrice,
      },
      {
        onSuccess: (data) => {
          toast.success("Booking confirmed! Processing payment...")
          setTimeout(() => {
            router.push(`/confirmation/${data.id}`)
          }, 1000)
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Booking failed")
        },
      },
    )
  }

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary-dark rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Select Your Seats</h1>
        <p className="text-primary-light">
          {trip.from} → {trip.to}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Seat Grid */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6 text-foreground">Choose Your Seats</h2>
            <SeatGrid seats={seats} selectedSeats={selectedSeats} onSelectSeat={handleSelectSeat} />
          </Card>

          {/* Passenger Details */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 text-foreground">Passenger Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-foreground placeholder-foreground-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  placeholder="+250..."
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-foreground placeholder-foreground-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          {/* Payment Methods */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 text-foreground">Payment Method</h2>
            <PaymentMethods selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
          </Card>
        </div>

        {/* Sidebar - Order Summary */}
        <div className="space-y-4">
          {/* Summary Card */}
          <Card className="p-6 sticky top-4">
            <h3 className="text-lg font-bold text-foreground mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4 pb-4 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">Route:</span>
                <span className="font-medium text-foreground">
                  {trip.from} → {trip.to}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">Departure:</span>
                <span className="font-medium text-foreground">{trip.departureTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground-muted">Selected Seats:</span>
                <span className="font-medium text-foreground">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-foreground-muted">Price per seat:</span>
                <span className="text-foreground">{trip.price.toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-muted">Quantity:</span>
                <span className="text-foreground">{selectedSeats.length}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                <span>Total:</span>
                <span className="text-primary">{totalPrice.toLocaleString()} RWF</span>
              </div>
            </div>

            {selectedSeats.length === 0 && (
              <Alert className="mb-4 bg-warning/10 border-warning">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Please select at least one seat</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleConfirmBooking}
              disabled={
                selectedSeats.length === 0 || createBookingMutation.isPending || !passengerName || !passengerPhone
              }
              className="w-full bg-primary hover:bg-primary-dark text-white py-6 font-semibold disabled:opacity-50"
            >
              {createBookingMutation.isPending ? "Processing..." : "Confirm Booking"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
