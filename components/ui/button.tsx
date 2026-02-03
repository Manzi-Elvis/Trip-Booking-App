"use client"

import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary"
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit"
  className?: string
  fullWidth?: boolean
  size?: "sm" | "md" | "lg"
}

export function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  type = "button",
  className = "",
  fullWidth = false,
  size = "md",
}: ButtonProps) {
  const baseClass =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const sizeClass = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  }[size]

  const variantClass =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-dark"
      : "border border-border bg-surface text-foreground hover:bg-surface-light"

  const widthClass = fullWidth ? "w-full" : ""

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${sizeClass} ${variantClass} ${widthClass} ${className}`}
    >
      {children}
    </button>
  )
}
