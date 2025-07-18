// components/hero/hero-image-desktop.tsx
"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const HeroImageDesktop = () => {
  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
      {/* Left Superman Image */}
      <motion.div
        className="absolute left-0 top-0 w-1/2 h-full z-20"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="/images/promo-banner/hero-promo-banner1.webp"
          alt="Superman BYD Campaign"
          fill
          className="object-cover object-right"
          sizes="(min-width: 768px) 50vw, 0px"
          priority
        />
      </motion.div>

      {/* Right Cars Image */}
      <motion.div
        className="absolute right-0 top-0 w-1/2 h-full z-20"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="/images/promo-banner/hero-promo-banner2.webp"
          alt="BYD Supercharged"
          fill
          className="object-cover object-left"
          sizes="(min-width: 768px) 50vw, 0px"
          priority
        />
      </motion.div>

      {/* Center Glow Effect */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent z-30"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
    </div>
  )
}

export default HeroImageDesktop