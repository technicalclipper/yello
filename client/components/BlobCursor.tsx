'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#ffce47',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  fastDuration = 0.12,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 9999
}) {
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize blobs at center
   
let activated = false;

const move = (e: MouseEvent) => {
  if (!activated) {
    activated = true;
    blobsRef.current.forEach((blob, i) => {
      if (!blob) return;
      gsap.to(blob, {
        opacity: opacities[i],
        duration: 0.3
      });
    });
  }

  blobsRef.current.forEach((blob, i) => {
    if (!blob) return;
    const isLead = i === 0;

    gsap.to(blob, {
      x: e.clientX,
      y: e.clientY,
      duration: isLead ? fastDuration : slowDuration,
      ease: isLead ? fastEase : slowEase
    });
  });
};


    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [fastDuration, slowDuration, fastEase, slowEase]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex }}
    >
      {/* Gooey Filter */}
      <svg className="absolute w-0 h-0">
        <filter id={filterId}>
          <feGaussianBlur
            in="SourceGraphic"
            result="blur"
            stdDeviation={filterStdDeviation}
          />
          <feColorMatrix
            in="blur"
            values={filterColorMatrixValues}
          />
        </filter>
      </svg>

      {/* Blob Layer */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ filter: `url(#${filterId})` }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => (blobsRef.current[i] = el)}
            className="fixed will-change-transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: sizes[i],
              height: sizes[i],
              backgroundColor: fillColor,
              opacity: opacities[i],
              borderRadius: blobType === 'circle' ? '50%' : '0',
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`
            }}
          >
            {/* Inner highlight */}
            <div
              className="absolute"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
