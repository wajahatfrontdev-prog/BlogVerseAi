"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  const features = [
    {
      title: "AI-Powered",
      description: "Leverage advanced AI to generate unique, high-quality blog content",
    },
    {
      title: "Lightning Fast",
      description: "Create blog posts in seconds, not hours",
    },
    {
      title: "User-Friendly",
      description: "Simple interface that anyone can use without technical knowledge",
    },
    {
      title: "SEO Optimized",
      description: "Generated content is optimized for search engines",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">About BlogVerseAI</h1>
          <p className="mt-4 text-lg text-foreground/60">
            Revolutionizing content creation with artificial intelligence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 rounded-lg bg-primary/5 p-8"
        >
          <p className="text-base leading-relaxed text-foreground/70">
            BlogVerseAI is a cutting-edge platform designed to help content creators, marketers, and businesses generate
            engaging blog posts instantly. Our advanced AI models understand context, tone, and audience preferences to
            produce content that resonates and converts.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="border border-border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-foreground/60">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
