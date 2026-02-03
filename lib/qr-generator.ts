// Simple QR code ASCII art generator (for demo purposes)
// In production, use a library like 'qrcode.react'
export function generateQRCodeData(text: string): string {
  // Generate a simple pattern based on text hash
  // In production, replace with actual QR code library
  return btoa(text).substring(0, 50)
}

export function generateQRCodeSvg(ticketNumber: string) {
  // Simple ASCII QR code representation
  // In production, use qrcode.react or similar library
  return `
    ▄▄▄▄▄▄▄ █   ▀█▀▀▄█ ▄▄▄▄▄▄▄
    █ ▀▀▀ █ █▀█▀ ██  █ █ ▀▀▀ █
    █ ███ █  █▀ █▀▀  █ █ ███ █
    █▄▄▄▄▄█ ▄▀▄▀▄ ▄▀▄▀█ █▄▄▄▄▄█
    ▄▄▄▄▄▄▄ ▀▀▀ █▀▀▀▀█ ▄▄▄▄▄▄▄
    █ ▀▀▀ █ █▀█▀ █▀▀  █
    █ ███ █  █▀ █▀▀ ██  █
  `.trim()
}
