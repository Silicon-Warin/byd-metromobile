// components/hero/hero-content.tsx
"use client"
import { motion } from "framer-motion"
import HeroImageDesktop from "./Hero/hero-image-desktop"
import HeroImageMobile from "./Hero/hero-image-mobile"
import HeroText from "./Hero/hero-text"
import HeroCTA from "./Hero/hero-cta"

const HeroContent = () => {
  return (
    <div className="max-w-7xl mx-auto w-full md:pt-24 px-4">
      {/* Hero Images - CSS-based Responsive Display */}
      <div className="relative mb-8 mt-24 md:mb-12 overflow-hidden rounded-2xl md:rounded-3xl border border-slate-700/50">
        {/* Desktop Version - Hidden on mobile */}
        <div className="hidden md:block">
          <HeroImageDesktop />
        </div>
        
        {/* Mobile Version - Hidden on desktop */}
        <div className="block md:hidden">
          <HeroImageMobile />
        </div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="text-center space-y-6 md:space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <HeroText />
        <HeroCTA />
      </motion.div>
    </div>
  )
}

export default HeroContent