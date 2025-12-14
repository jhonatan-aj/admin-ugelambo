import React from 'react'
import './globals.css'

export const metadata = {
  description: 'Panel de Administración - UGEL Ambo',
  title: 'UGEL Ambo - Administración',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
