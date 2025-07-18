"use client";
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const HeroImageMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(1) // เริ่มที่ index 1 เพื่อให้ infinite loop ทำงานได้
  const [isTransitioning, setIsTransitioning] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const images = [
    {
      src: "/images/promo-banner/hero-promo-banner1.webp",
      alt: "Superman BYD Campaign",
      gradient: "from-red-500/30 via-orange-400/20 to-blue-500/30"
    },
    {
      src: "/images/promo-banner/hero-promo-banner2.webp", 
      alt: "BYD Supercharged",
      gradient: "from-purple-500/30 via-pink-400/20 to-yellow-400/30"
    }
  ]

// สร้าง array สำหรับ infinite loop: [image2, image1, image2, image1, image2]
const infiniteImages = [
    images[images.length - 1], // รูปสุดท้าย
    ...images,
    images[0] // รูปแรก
  ]

  // Auto-slide ทุก 4 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // จัดการ infinite loop
  useEffect(() => {
    if (currentIndex === infiniteImages.length - 1) {
      // เมื่อถึงรูปสุดท้าย (duplicate ของรูปแรก)
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(1) // กลับไปรูปแรกจริง
        setTimeout(() => setIsTransitioning(true), 50)
      }, 1500) // รอให้ transition จบก่อน
    } else if (currentIndex === 0) {
      // เมื่อถึงรูปแรก (duplicate ของรูปสุดท้าย)
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(images.length) // กลับไปรูปสุดท้ายจริง
        setTimeout(() => setIsTransitioning(true), 50)
      }, 1500)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex, images.length, infiniteImages.length])

  return (
    <div className="relative h-[50vh] sm:h-[55vh] overflow-hidden rounded-2xl shadow-2xl">
      
      {/* Main Carousel Container */}
      <div 
        className={`flex h-full w-full ${isTransitioning ? 'transition-transform duration-[1500ms] ease-in-out' : ''}`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`
        }}
      >
        {infiniteImages.map((image, index) => (
          <div 
            key={index}
            className="relative w-full h-full flex-shrink-0"
          >
            {/* Background Image */}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover aspect-video"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 0px"              
            />
            
            {/* Dynamic Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient} mix-blend-overlay`} />
            
            {/* Subtle Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </div>
        ))}
      </div>

      {/* Animated Glow Effect */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-12 pointer-events-none z-10 animate-pulse"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 30%, rgba(239, 68, 68, 0.4) 50%, rgba(59, 130, 246, 0.3) 70%, transparent 100%)',
        }}
      />

      {/* Promotion Badge */}
      <div className="absolute top-6 right-6 z-20 animate-fade-in">
        <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          LIMITED TIME
        </div>
      </div>

      {/* Subtle Animation Border */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none z-30 opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 25%, transparent 50%, rgba(255,255,255,0.1) 75%, transparent 100%)',
          backgroundSize: '200% 200%',
          animation: 'shimmer 4s ease-in-out infinite'
        }}
      />

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 200% 200%; }
            100% { background-position: -200% -200%; }
          }
        `}
      </style>
    </div>
  )
}

export default HeroImageMobile