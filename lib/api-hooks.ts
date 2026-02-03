"use client"

import { useQuery, useMutation } from "@tanstack/react-query"
import { apiClient } from "./api-client"
import type { Trip, Booking } from "./api-types"

// Fetch trips based on search criteria
export const useTrips = (from: string, to: string, date: string) => {
  return useQuery({
    queryKey: ["trips", from, to, date],
    queryFn: async () => {
      const { data } = await apiClient.get<Trip[]>("/trips", {
        params: { from, to, date },
      })
      return data
    },
    enabled: !!from && !!to && !!date,
  })
}

// Fetch single trip details with seats
export const useTripDetails = (tripId: string) => {
  return useQuery({
    queryKey: ["trip", tripId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/trips/${tripId}`)
      return data
    },
    enabled: !!tripId,
  })
}

// Fetch user bookings
export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await apiClient.get<Booking[]>("/bookings")
      return data
    },
  })
}

// Create booking mutation
export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (bookingData: Partial<Booking>) => {
      const { data } = await apiClient.post("/bookings", bookingData)
      return data
    },
  })
}

// Process payment mutation
export const useProcessPayment = () => {
  return useMutation({
    mutationFn: async (paymentData: {
      bookingId: string
      paymentMethod: string
      amount: number
    }) => {
      const { data } = await apiClient.post("/payments", paymentData)
      return data
    },
  })
}

// Login mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await apiClient.post("/auth/login", credentials)
      if (data.token) {
        localStorage.setItem("authToken", data.token)
      }
      return data
    },
  })
}

// Register mutation
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: {
      name: string
      email: string
      password: string
      phone?: string
    }) => {
      const { data } = await apiClient.post("/auth/register", userData)
      if (data.token) {
        localStorage.setItem("authToken", data.token)
      }
      return data
    },
  })
}
