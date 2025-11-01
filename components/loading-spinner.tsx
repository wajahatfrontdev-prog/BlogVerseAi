"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
        className="h-3 w-3 rounded-full bg-primary"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
        className="h-3 w-3 rounded-full bg-primary"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
        className="h-3 w-3 rounded-full bg-primary"
      />
    </div>
  )
}
