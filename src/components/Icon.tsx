'use client'

import Image from 'next/image'

export const Icon = () => {
  return (
    <Image
      src="/icon-ugel.png"
      alt="UGEL Ambo"
      width={32}
      height={32}
      style={{ borderRadius: '6px' }}
    />
  )
}

export default Icon
