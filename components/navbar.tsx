"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary">BlogVerseAI</div>
        </Link>

        <div className="hidden gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground">
            Home
          </Link>
          <Link
            href="/generate"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Generate Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="/generate"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Generate
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
