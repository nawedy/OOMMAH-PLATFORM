import React from 'react'
import Image from 'next/image'

interface AdBannerProps {
  src: string
  alt: string
  link: string
}

export function AdBanner({ src, alt, link }: AdBannerProps) {
  return (
    <div className="w-full max-w-screen-xl mx-auto my-4">
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative w-full h-[90px]">
          <Image
            src={src}
            alt={alt}
            fill
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </a>
    </div>
  )
}

