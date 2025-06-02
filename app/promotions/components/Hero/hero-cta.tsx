// components/hero/hero-cta.tsx
"use client"
import { motion } from "framer-motion"
import LineOALinkButton from "@/components/Line/line-button"

const HeroCTA = () => {
  return (
    <motion.div
      className="space-y-3 md:space-y-4 mt-8 md:mt-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.0 }}
    >
      <LineOALinkButton className="bg-gradient-to-r from-red-700 to-blue-700 hover:from-red-800 hover:to-blue-800 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-bold rounded-full shadow-2xl shadow-red-900/25 border border-slate-600/20 w-full sm:w-auto">
        รับข้อเสนอพิเศษเพิ่มเติม
      </LineOALinkButton>

      <div className="space-y-1">
        <p className="text-xs md:text-sm text-slate-400">
          พิเศษ! 1 มิ.ย. - 31 ก.ค. 68 เท่านั้น
        </p>
        <p className="text-xs text-slate-500">
          *เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด
        </p>
      </div>
    </motion.div>
  )
}

export default HeroCTA