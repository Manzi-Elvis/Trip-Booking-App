"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketCard } from "@/components/ticket-card"
import { useParams, useRouter } from "next/navigation"
import { dummyTrips, dummyBookings } from "@/lib/dummy-data"
import { CheckCircle, Calendar, Users, MapPin } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = params.id as string

  const booking = dummyBookings[0]
  const trip = dummyTrips.find((t) => t.id === booking.tripId) || dummyTrips[0]

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/20 mb-4">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
        <p className="text-foreground-muted text-lg">Your trip has been successfully booked</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Details */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Booking Details</h2>

            <div className="space-y-4">
              {/* Route */}
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground-muted">Route</p>
                  <p className="text-lg font-bold text-foreground">
                    {trip.from} → {trip.to}
                  </p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-center gap-4">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground-muted">Departure</p>
                  <p className="text-lg font-bold text-foreground">{trip.departureTime} today</p>
                </div>
              </div>

              {/* Seats */}
              <div className="flex items-center gap-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground-muted">Seats</p>
                  <p className="text-lg font-bold text-foreground">{booking.seats.join(", ")}</p>
                </div>
              </div>

              {/* Amount Paid */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-foreground-muted">Amount Paid:</span>
                  <p className="text-2xl font-bold text-primary">{booking.totalPrice.toLocaleString()} RWF</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Status */}
          <Alert className="bg-success/10 border-success">
            <CheckCircle className="h-4 w-4 text-success" />
            <AlertDescription className="text-success">
              Payment confirmed via{" "}
              {booking.paymentMethod === "mtn"
                ? "MTN Mobile Money"
                : booking.paymentMethod === "airtel"
                  ? "Airtel Money"
                  : "Cash"}
            </AlertDescription>
          </Alert>

          {/* Ticket */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Ticket</h2>
            <TicketCard
              ticketNumber={booking.ticketNumber}
              from={trip.from}
              to={trip.to}
              departureTime={trip.departureTime}
              date={new Date().toLocaleDateString()}
              seats={booking.seats}
              busCompany={trip.busCompany}
              totalPrice={booking.totalPrice}
              paymentStatus={booking.status as "confirmed" | "pending"}
            />
          </div>

          {/* Important Info */}
          <Card className="p-6 bg-warning/5 border-warning/30">
            <h3 className="font-bold text-foreground mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li>• Please arrive at the bus station 30 minutes before departure</li>
              <li>• Show your ticket on your phone or printed version at boarding</li>
              <li>• Keep your ticket number for future reference</li>
              <li>• For assistance, contact our support team</li>
            </ul>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/">
                <Button className="w-full bg-primary hover:bg-primary-dark text-white">Book Another Trip</Button>
              </Link>
              <Link href="/bookings">
                <Button variant="secondary" className="w-full">
                  View My Bookings
                </Button>
              </Link>
            </div>
          </Card>

          {/* Support Card */}
          <Card className="p-6">
            <h3 className="font-bold text-foreground mb-3">Need Help?</h3>
            <p className="text-sm text-foreground-muted mb-4">
              Contact our support team if you need assistance with your booking.
            </p>
            <Button variant="secondary" className="w-full text-sm">
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
