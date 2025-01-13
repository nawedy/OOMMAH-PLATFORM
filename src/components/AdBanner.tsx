import React from 'react';
import Image from 'next/image';

interface AdBannerProps {
  src: string;
  alt: string;
  link: string;
}

export function AdBanner({ src, alt, link }: AdBannerProps) {
  return (
    <div className="w-full max-w-screen-xl mx-auto my-4">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Image
          src={src}
          alt={alt}
          width={728}
          height={90}
          layout="responsive"
          className="rounded-lg shadow-md"
        />
      </a>
    </div>
  );
}

