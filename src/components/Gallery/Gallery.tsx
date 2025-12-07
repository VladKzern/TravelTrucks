'use client';

import Image from 'next/image';
import { CamperImage } from '@/lib/types';
import css from './Gallery.module.css';

type GalleryProps = {
  images: CamperImage[];
};

export default function Gallery({ images }: GalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className={css.gallery}>
      {images.map((img, idx) => (
        <div key={idx} className={css.thumb}>
          <Image
            src={img.thumb}
            alt={`Gallery image ${idx + 1}`}
            width={292}
            height={312}
            className={css.image}
          />
        </div>
      ))}
    </div>
  );
}
