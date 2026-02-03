"use client"
import { BookingCard } from "@/components/booking-card"
import { PageHeader } from "@/components/page-header"
import { StatsCard } from "@/components/stats-card"
import { Ticket, CheckCircle, Clock } from "lucide-react"

export function BookingsPage() {
  const bookings = [
    {
      id: "BK001",
      bookingNumber: "001",
      from: "Kigali",
      to: "Butare",
      date: "2024-11-15",
      departure: "08:00 AM",
      seat: "A12",
      status: "confirmed" as const,
      price: "5000 RWF",
      company: "Express Travel",
    },
    {
      id: "BK002",
      bookingNumber: "002",
      from: "Kigali",
      to: "Gisenyi",
      date: "2024-11-18",
      departure: "10:30 AM",
      seat: "B05",
      status: "pending" as const,
      price: "6500 RWF",
      company: "Star Coach",
    },
    {
      id: "BK003",
      bookingNumber: "003",
      from: "Butare",
      to: "Kigali",
      date: "2024-11-10",
      departure: "02:00 PM",
      seat: "C08",
      status: "confirmed" as const,
      price: "5000 RWF",
      company: "Express Travel",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader title="My Bookings" description="View and manage your trip reservations" />

      {/* Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard icon={CheckCircle} value="2" label="Upcoming Trips" color="success" />
        <StatsCard icon={Clock} value="1" label="Pending Confirmation" color="warning" />
        <StatsCard icon={Ticket} value="1" label="Completed" color="primary" />
      </div>

      {/* Bookings List */}
      <div className="space-y-3 sm:space-y-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            {...booking}
            onCancel={() => console.log("Cancelling booking:", booking.id)}
            onDownload={() => console.log("Downloading ticket:", booking.id)}
          />
        ))}
      </div>
    </div>
  )
}
