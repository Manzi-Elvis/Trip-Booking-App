// Dummy data for development/preview
import type { Trip, Booking } from "./api-types"

export const dummyTrips: Trip[] = [
  {
    id: "trip-1",
    from: "Kigali",
    to: "Huye",
    departureTime: "08:00",
    arrivalTime: "11:30",
    price: 5000,
    duration: "3h 30m",
    busCompany: "Rwanda Coach",
    availableSeats: 8,
    totalSeats: 50,
  },
  {
    id: "trip-2",
    from: "Kigali",
    to: "Huye",
    departureTime: "12:00",
    arrivalTime: "15:30",
    price: 5000,
    duration: "3h 30m",
    busCompany: "Horizon Express",
    availableSeats: 12,
    totalSeats: 50,
  },
  {
    id: "trip-3",
    from: "Kigali",
    to: "Huye",
    departureTime: "16:00",
    arrivalTime: "19:30",
    price: 5500,
    duration: "3h 30m",
    busCompany: "Rwanda Coach",
    availableSeats: 5,
    totalSeats: 50,
  },
  {
    id: "trip-4",
    from: "Kigali",
    to: "Gitarama",
    departureTime: "07:00",
    arrivalTime: "08:30",
    price: 2500,
    duration: "1h 30m",
    busCompany: "City Transit",
    availableSeats: 20,
    totalSeats: 45,
  },
  {
    id: "trip-5",
    from: "Kigali",
    to: "Gitarama",
    departureTime: "14:00",
    arrivalTime: "15:30",
    price: 2500,
    duration: "1h 30m",
    busCompany: "Rwanda Coach",
    availableSeats: 15,
    totalSeats: 45,
  },
]

export const dummyBookings: Booking[] = [
  {
    id: "booking-1",
    tripId: "trip-1",
    userId: "user-1",
    seats: ["A1", "A2"],
    paymentMethod: "mtn",
    status: "confirmed",
    totalPrice: 10000,
    bookingDate: "2025-01-15",
    ticketNumber: "RWT-2025-001",
  },
  {
    id: "booking-2",
    tripId: "trip-2",
    userId: "user-1",
    seats: ["B5"],
    paymentMethod: "airtel",
    status: "confirmed",
    totalPrice: 5000,
    bookingDate: "2025-01-10",
    ticketNumber: "RWT-2025-002",
  },
]

export const generateSeatGrid = (totalSeats: number, bookedSeats: string[] = [], selectedSeats: string[] = []) => {
  const seats = []
  const columns = 4
  const rows = Math.ceil(totalSeats / columns)

  let seatNumber = 1
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (seatNumber <= totalSeats) {
        const seatId = String.fromCharCode(65 + i) + (j + 1)
        let status: "available" | "booked" | "selected" = "available"
        if (bookedSeats.includes(seatId)) status = "booked"
        if (selectedSeats.includes(seatId)) status = "selected"

        seats.push({
          id: seatId,
          seatNumber: seatNumber,
          status,
        })
        seatNumber++
      }
    }
  }
  return seats
}
