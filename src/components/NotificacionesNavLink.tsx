'use client'

import React from 'react'
import Link from 'next/link'

export const NotificacionesNavLink: React.FC = () => {
  return (
    <Link
      href="/admin/notificaciones"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0.5rem 1rem',
        color: 'var(--theme-elevation-600, #475569)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        borderRadius: '6px',
        transition: 'background-color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--theme-elevation-100, #f1f5f9)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      Notificaciones
    </Link>
  )
}
