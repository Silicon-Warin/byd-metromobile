"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { MessageCircle, X } from "tabler-icons-react"
import { SocialIcon } from "@/app/utils/SocialIcon"
import { AnimatePresence, motion } from "framer-motion"

export default function ContactFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const fabRef = useRef<HTMLDivElement>(null)

  const handleClose = () => {
    setIsOpen(false)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 400)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node) && isOpen && !isAnimating) {
        handleClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, isAnimating])

  // Contact options
  const contactOptions = [
    {
      icon: <SocialIcon type="line" size={20} url="https://line.me/R/ti/p/%40bydmetromobile" />,
      label: "Line",
      href: "https://line.me/R/ti/p/%40bydmetromobile",
      fallbackHref: "https://line.me/R/ti/p/%40bydmetromobile",
      color: "bg-green-500",
      glowColor: "34, 197, 94",
    },
    {
      icon: <SocialIcon type="facebook" size={20} url="https://facebook.com/bydbangkok" />,
      label: "Facebook",
      href: "https://facebook.com/bydbangkok",
      fallbackHref: "https://m.facebook.com/bydbangkok",
      color: "bg-blue-600",
      glowColor: "37, 99, 235",
    },
    {
      icon: <SocialIcon type="instagram" size={20} url="https://instagram.com/byd.metromobile" />,
      label: "Instagram",
      href: "https://instagram.com/byd.metromobile",
      fallbackHref: "https://www.instagram.com/byd.metromobile",
      color: "bg-pink-500",
      glowColor: "236, 72, 153",
    },
    {
      icon: <SocialIcon type="tiktok" size={20} url="https://tiktok.com/@bydbangkok" />,
      label: "TikTok",
      href: "https://www.tiktok.com/@byd_metromobile",
      fallbackHref: "https://www.tiktok.com/@byd_metromobile",
      color: "bg-black",
      glowColor: "0, 0, 0",
    },
  ]

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  const handleContactClick = (option: (typeof contactOptions)[0]) => {
    if (isMobile()) {
      window.location.href = option.fallbackHref || option.href
    } else {
      window.open(option.href, "_blank", "noopener,noreferrer")
    }
    handleClose()
  }

  const handleToggle = () => {
    if (!isAnimating) {
      setIsOpen(!isOpen)
    }
  }

  // Animation variants
  const menuContainerVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut",
        staggerChildren: 0.06,
        staggerDirection: 1,
        delayChildren: 0.05,
      },
    },
  }

  const menuItemVariants = {
    closed: {
      y: 15,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.25,
        ease: [0.4, 0.0, 0.2, 1], 
      },
    },
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.0, 0.0, 0.2, 1], 
      },
    },
  }

  return (
    <div ref={fabRef} className="fixed bottom-6 right-6 z-50">
      {/* Contact Menu - Positioned above the main button */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="contact-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuContainerVariants}
            className="absolute bottom-16 right-0 flex flex-col-reverse gap-3 items-end"
          >
            {contactOptions.map((option, index) => (
              <motion.button
                key={`contact-${index}`}
                variants={menuItemVariants}
                onClick={() => handleContactClick(option)}
                className={cn(
                  "flex items-center gap-2 rounded-full p-3 text-white cursor-pointer border-none",
                  option.color,
                  "hover:scale-105 active:scale-95 transition-transform duration-200",
                )}
                style={{
                  boxShadow: `0 0 15px rgba(${option.glowColor}, 0.6)`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 25px rgba(${option.glowColor}, 0.8)`,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Contact via ${option.label}`}
              >
                <span className="text-sm font-medium mr-1 hidden md:inline-block whitespace-nowrap">
                  {option.label}
                </span>
                <div className="[&>svg]:fill-white flex-shrink-0">{option.icon}</div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button - Fixed position */}
      <motion.button
        onClick={handleToggle}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full",
          "bg-gradient-to-r from-purple-600 to-blue-500 text-white",
          "shadow-[0_0_20px_rgba(147,51,234,0.7)]",
          "transition-all duration-300 ease-in-out",
        )}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
        type="button"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px rgba(147, 51, 234, 0.9)",
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 90 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
