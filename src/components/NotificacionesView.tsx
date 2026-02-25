'use client'

import React, { useState } from 'react'

interface SendResult {
  message: string
  sent: number
  failed: number
  expired: number
  totalSubscribers: number
}

export const NotificacionesView: React.FC = () => {
  const [title, setTitle] = useState('UGEL Ambo')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingStats, setLoadingStats] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null)
  const [result, setResult] = useState<SendResult | null>(null)
  const [error, setError] = useState('')
  const [secret, setSecret] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  async function fetchStats(secretKey?: string) {
    const key = secretKey || secret
    setLoadingStats(true)
    setError('')
    try {
      const res = await fetch(`/api/notifications?secret=${encodeURIComponent(key)}`)
      if (res.status === 401) {
        setError('Clave secreta incorrecta')
        setAuthenticated(false)
        return false
      }
      const data = await res.json()
      setSubscriberCount(data.subscribers)
      setAuthenticated(true)
      return true
    } catch {
      setError('Error al conectar con el servidor')
      return false
    } finally {
      setLoadingStats(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    await fetchStats(secret)
  }

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
        body: JSON.stringify({ title, body, secret }),
      })

      if (res.status === 401) {
        setError('Clave secreta incorrecta')
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

  // Auth screen
  if (!authenticated) {
    return (
      <div style={{ maxWidth: '420px', margin: '3rem auto', padding: '0 1rem' }}>
        <div
          style={{
            backgroundColor: 'var(--theme-elevation-50, #f8fafc)',
            borderRadius: '12px',
            border: '1px solid var(--theme-elevation-100, #e2e8f0)',
            padding: '2rem',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <svg
                width="24"
                height="24"
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
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
              Notificaciones Push
            </h2>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--theme-elevation-400, #94a3b8)',
                margin: 0,
              }}
            >
              Ingresa la clave secreta para acceder
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Clave secreta"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--theme-elevation-150, #cbd5e1)',
                borderRadius: '8px',
                fontSize: '0.9375rem',
                marginBottom: '0.75rem',
                boxSizing: 'border-box',
                backgroundColor: 'var(--theme-input-bg, white)',
                color: 'var(--theme-text, inherit)',
              }}
            />
            <button
              type="submit"
              disabled={!secret || loadingStats}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: !secret ? 'not-allowed' : 'pointer',
                opacity: !secret ? 0.5 : 1,
              }}
            >
              {loadingStats ? 'Verificando...' : 'Acceder'}
            </button>
          </form>

          {error && (
            <p
              style={{
                marginTop: '0.75rem',
                padding: '0.625rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                color: '#dc2626',
                fontSize: '0.8125rem',
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Main panel
  return (
    <div style={{ maxWidth: '640px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="20"
              height="20"
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
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Notificaciones Push</h1>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--theme-elevation-400, #94a3b8)',
                margin: 0,
              }}
            >
              Enviar notificaciones al portal web
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setAuthenticated(false)
            setSecret('')
            setSubscriberCount(null)
            setResult(null)
          }}
          style={{
            padding: '0.375rem 0.75rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            color: '#dc2626',
            fontSize: '0.8125rem',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          backgroundColor: 'var(--theme-elevation-50, #f8fafc)',
          border: '1px solid var(--theme-elevation-100, #e2e8f0)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--theme-elevation-400, #94a3b8)',
              margin: '0 0 2px',
            }}
          >
            Suscriptores activos
          </p>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0, lineHeight: 1 }}>
            {subscriberCount ?? '—'}
          </p>
        </div>
        <button
          onClick={() => fetchStats()}
          disabled={loadingStats}
          title="Refrescar"
          style={{
            marginLeft: 'auto',
            padding: '0.5rem',
            backgroundColor: 'var(--theme-elevation-100, #e2e8f0)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: loadingStats ? 'notif-spin 1s linear infinite' : 'none' }}
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      </div>

      {/* Send Form */}
      <div
        style={{
          backgroundColor: 'var(--theme-elevation-50, #f8fafc)',
          border: '1px solid var(--theme-elevation-100, #e2e8f0)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.25rem',
        }}
      >
        <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 1rem' }}>
          Enviar Notificación
        </h2>
        <form onSubmit={handleSend}>
          <div style={{ marginBottom: '0.875rem' }}>
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
                padding: '0.625rem 0.75rem',
                border: '1px solid var(--theme-elevation-150, #cbd5e1)',
                borderRadius: '8px',
                fontSize: '0.9375rem',
                boxSizing: 'border-box',
                backgroundColor: 'var(--theme-input-bg, white)',
                color: 'var(--theme-text, inherit)',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
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
                padding: '0.625rem 0.75rem',
                border: '1px solid var(--theme-elevation-150, #cbd5e1)',
                borderRadius: '8px',
                fontSize: '0.9375rem',
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
              padding: '0.75rem',
              backgroundColor: loading || !body.trim() ? '#93c5fd' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9375rem',
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
                  width="18"
                  height="18"
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
                  width="18"
                  height="18"
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
      </div>

      {/* Result */}
      {result && (
        <div
          style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.25rem',
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}
          >
            <svg
              width="20"
              height="20"
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
            <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.9375rem' }}>
              ¡Notificación enviada!
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#16a34a', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                {result.sent}
              </p>
              <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Enviadas</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  color: result.failed > 0 ? '#d97706' : '#64748b',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {result.failed}
              </p>
              <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Fallidas</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#64748b', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                {result.totalSubscribers}
              </p>
              <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>Total</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p
          style={{
            padding: '0.75rem',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#dc2626',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </p>
      )}

      <style>{`
        @keyframes notif-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
