// components/hero/hero-text.tsx
"use client"
import { motion } from "framer-motion"

const HeroText = () => {
  return (
    <>
      {/* Main Title */}
      <div className="space-y-3 md:space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-blue-300 via-slate-100 to-red-300 bg-clip-text text-transparent">
            SUPERMAN
          </span>
        </h1>
        
        {/* Divider */}
        <div className="flex items-center justify-center space-x-3 md:space-x-4">
          <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-blue-600 to-red-600" />
          <span className="text-xl sm:text-2xl md:text-4xl font-bold text-slate-200">X</span>
          <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-red-600 to-blue-600" />
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">BYD</h2>
        <p className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
          SUPERCHARGED
        </p>
      </div>

      {/* Feature Box */}
      <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto px-4">
        <motion.div
          className="bg-gradient-to-r from-red-900/30 to-blue-900/30 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-600/30 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <p className="text-base sm:text-lg md:text-xl text-red-300 font-bold mb-2 md:mb-3">
            💥 ไม่มีผ้าคลุม...แต่คุณคือ Superman บนท้องถนน
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-base">
            <span className="text-slate-300">แรงจัด 💨</span>
            <span className="text-slate-300">เงียบจริง 🔇</span>
            <span className="text-slate-300">ควบคุมได้ดั่งใจ 🧠</span>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default HeroText