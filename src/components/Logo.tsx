'use client'

import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Image
        src="/logo-ugel.png"
        alt="UGEL Ambo"
        width={40}
        height={40}
        style={{ borderRadius: '8px' }}
      />
      <span
        style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#223F59',
          letterSpacing: '-0.5px',
        }}
      >
        UGEL Ambo
      </span>
    </div>
  )
}

export default Logo
