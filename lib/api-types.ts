// Types for API responses
export interface Trip {
  id: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  price: number
  duration: string
  busCompany: string
  availableSeats: number
  totalSeats: number
}

export interface Seat {
  id: string
  seatNumber: string
  status: "available" | "booked" | "selected"
}

export interface Booking {
  id: string
  tripId: string
  userId: string
  seats: string[]
  paymentMethod: "mtn" | "airtel" | "cash"
  status: "pending" | "confirmed" | "cancelled"
  totalPrice: number
  bookingDate: string
  ticketNumber: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}
