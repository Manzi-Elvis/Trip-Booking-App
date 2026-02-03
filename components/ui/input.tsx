"use client"

import type React from "react"

interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  required?: boolean
}

export function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
}: InputProps) {
  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="input"
      />
    </div>
  )
}
