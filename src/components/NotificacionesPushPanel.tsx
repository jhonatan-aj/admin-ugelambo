'use client'

import React, { useState, useEffect } from 'react'

interface SendResult {
  message: string
  sent: number
  failed: number
  expired: number
  totalSubscribers: number
}

export const NotificacionesPushPanel: React.FC = () => {
  const [title, setTitle] = useState('UGEL Ambo')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null)
  const [result, setResult] = useState<SendResult | null>(null)
  const [error, setError] = useState('')
  const [collapsed, setCollapsed] = useState(false)

  async function fetchStats() {
    try {
      const res = await fetch('/api/notifications')
      if (res.ok) {
        const data = await res.json()
        setSubscriberCount(data.subscribers)
      }
    } catch {
      // silently fail stats
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return

    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      })

      if (res.status === 401) {
        setError('No autorizado')
        return
      }

      const data: SendResult = await res.json()
      setResult(data)
      setBody('')
      fetchStats()
    } catch {
      setError('Error al enviar notificaciones')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        style={{
          backgroundColor: 'var(--theme-elevation-50, #f8fafc)',
          borderRadius: '12px',
          border: '1px solid var(--theme-elevation-100, #e2e8f0)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: collapsed ? 'none' : '1px solid var(--theme-elevation-100, #e2e8f0)',
            cursor: 'pointer',
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: 0 }}>
                Enviar Notificación Push
              </h3>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--theme-elevation-400, #94a3b8)',
                  margin: 0,
                }}
              >
                {subscriberCount !== null
                  ? `${subscriberCount} suscriptores activos`
                  : 'Enviar notificaciones al portal web'}
              </p>
            </div>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              color: 'var(--theme-elevation-400, #94a3b8)',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Collapsible content */}
        {!collapsed && (
          <div style={{ padding: '1.25rem' }}>
            <form onSubmit={handleSend}>
              <div style={{ marginBottom: '0.75rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    marginBottom: '0.25rem',
                    color: 'var(--theme-elevation-500, #64748b)',
                  }}
                >
                  Título
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="UGEL Ambo"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid var(--theme-elevation-150, #cbd5e1)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--theme-input-bg, white)',
                    color: 'var(--theme-text, inherit)',
                  }}
                />
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    marginBottom: '0.25rem',
                    color: 'var(--theme-elevation-500, #64748b)',
                  }}
                >
                  Mensaje
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Escribe el mensaje de la notificación..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid var(--theme-elevation-150, #cbd5e1)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    backgroundColor: 'var(--theme-input-bg, white)',
                    color: 'var(--theme-text, inherit)',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !body.trim()}
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  backgroundColor: loading || !body.trim() ? '#93c5fd' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: loading || !body.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {loading ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ animation: 'notif-spin 1s linear infinite' }}
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Enviar a todos los suscriptores
                  </>
                )}
              </button>
            </form>

            {/* Result */}
            {result && (
              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '0.75rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '0.5rem',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.875rem' }}>
                    ¡Notificación enviada!
                  </span>
                </div>
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <p
                      style={{ color: '#16a34a', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}
                    >
                      {result.sent}
                    </p>
                    <p style={{ color: '#64748b', fontSize: '0.6875rem', margin: 0 }}>Enviadas</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p
                      style={{
                        color: result.failed > 0 ? '#d97706' : '#64748b',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {result.failed}
                    </p>
                    <p style={{ color: '#64748b', fontSize: '0.6875rem', margin: 0 }}>Fallidas</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p
                      style={{ color: '#64748b', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}
                    >
                      {result.totalSubscribers}
                    </p>
                    <p style={{ color: '#64748b', fontSize: '0.6875rem', margin: 0 }}>Total</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <p
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  color: '#dc2626',
                  fontSize: '0.8125rem',
                  marginTop: '0.75rem',
                  marginBottom: 0,
                }}
              >
                {error}
              </p>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes notif-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
