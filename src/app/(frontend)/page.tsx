import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Image
              src="/logo-ugel.png"
              alt="UGEL Ambo"
              width={48}
              height={48}
              style={{ borderRadius: '12px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#223F59',
                  letterSpacing: '-0.5px',
                }}
              >
                UGEL Ambo
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                Panel de Administración
              </span>
            </div>
          </div>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#475569' }}>{user.email}</span>
              <Link
                href="/admin"
                style={{
                  backgroundColor: '#049DD9',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                Ir al Panel
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section con imagen de fondo */}
      <section
        style={{
          position: 'relative',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Imagen de fondo */}
        <Image src="/integridad.png" alt="UGEL Ambo" fill style={{ objectFit: 'cover' }} priority />
        {/* Overlay oscuro */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(34, 63, 89, 0.9) 0%, rgba(4, 157, 217, 0.85) 100%)',
          }}
        />

        {/* Contenido */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '3rem 2rem',
            maxWidth: '800px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 500,
              marginBottom: '1.5rem',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Sistema Administrativo</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              letterSpacing: '-1px',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            Bienvenido al Panel de
            <br />
            <span style={{ color: '#a5d8ff' }}>Administración UGEL Ambo</span>
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Gestiona el contenido del portal web institucional: personal, especialistas, materiales
            de fortalecimiento y noticias de manera centralizada.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'white',
                color: '#223F59',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              {user ? 'Ir al Panel de Administración' : 'Iniciar Sesión'}
            </Link>
            <a
              href="https://ugelambo.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Ver Portal Web
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'white' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#223F59',
            marginBottom: '3rem',
          }}
        >
          ¿Qué puedes gestionar?
        </h2>

        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Personal */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0284c7"
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
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#223F59',
                marginBottom: '0.5rem',
              }}
            >
              Personal
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
              Gestiona la información del personal administrativo
            </p>
          </div>

          {/* Especialistas */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#223F59',
                marginBottom: '0.5rem',
              }}
            >
              Especialistas
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
              Administra los especialistas pedagógicos
            </p>
          </div>

          {/* Fortalecimiento */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9333ea"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#223F59',
                marginBottom: '0.5rem',
              }}
            >
              Fortalecimiento
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
              Publica materiales de capacitación
            </p>
          </div>

          {/* Noticias */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ea580c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#223F59',
                marginBottom: '0.5rem',
              }}
            >
              Noticias
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
              Gestiona noticias e integridad
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#223F59',
          color: 'white',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '0.875rem', opacity: 0.9, margin: 0 }}>
          © {new Date().getFullYear()} UGEL Ambo - Unidad de Gestión Educativa Local
        </p>
        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>
          Jr. Juan Velasco Alvarado s/n - Ambo - Ambo - Huánuco - Perú (Referencia: Plaza de armas
          del centro poblado de Ayancocha - Ambo)
        </p>
      </footer>
    </div>
  )
}
