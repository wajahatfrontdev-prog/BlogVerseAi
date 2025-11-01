"use client"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, BookOpen, Copy, Eye } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  content: string
  topic: string
  createdAt: string
}

export default function Home() {
  const [savedBlogs, setSavedBlogs] = useState<BlogPost[]>([])
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem('savedBlogs') || '[]')
    setSavedBlogs(blogs.slice(0, 6))
  }, [])

  const formatContent = (content: string) => {
    let cleaned = content.replace(/\*\*/g, '').replace(/##/g, '').replace(/###/g, '')
    const paragraphs = cleaned.split('\n\n').filter(p => p.trim())
    return paragraphs
  }

  const openBlogDialog = (blog: BlogPost) => {
    setSelectedBlog(blog)
    setIsDialogOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Our AI Blog Generator?
            </h2>
            <p className="mt-4 text-lg text-foreground/60">
              Create high-quality, engaging content in minutes with advanced AI technology
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[ 
              { title: "Instant Generation", description: "Generate complete blog posts in seconds with our advanced AI models.", icon: "⚡" },
              { title: "SEO Optimized", description: "Content optimized for search engines to improve your online visibility.", icon: "🔍" },
              { title: "Customizable Topics", description: "Create blogs on any topic, from tech to lifestyle and everything in between.", icon: "🎯" },
              { title: "Save & Reuse", description: "Save your generated blogs and access them anytime for future use.", icon: "💾" },
              { title: "Responsive Design", description: "Blogs that look perfect on all devices and screen sizes.", icon: "📱" },
              { title: "Free to Use", description: "Start generating blogs without any cost or subscription required.", icon: "🆓" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground/60">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      {savedBlogs.length > 0 && (
        <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Your Recent Blogs
              </h2>
              <p className="mt-4 text-lg text-foreground/60">
                Check out your latest generated content
              </p>

              {/* 🗑️ Delete All Button */}
              <Button
                variant="destructive"
                size="sm"
                className="mt-6"
                onClick={() => {
                  if (confirm("Are you sure you want to delete all saved blogs?")) {
                    localStorage.removeItem("savedBlogs")
                    setSavedBlogs([])
                  }
                }}
              >
                🗑️ Delete All Blogs
              </Button>
            </motion.div>

            {/* Blogs Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {savedBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group h-full border border-border bg-white hover:border-primary/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-4 border-b border-border/50">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs font-semibold px-3 py-1 bg-white">
                          {blog.topic}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs text-foreground/60">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="font-medium">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-foreground leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                          {blog.title.replace(/\*\*/g, '').replace(/##/g, '').replace(/###/g, '')}
                        </h3>
                      </div>

                      <p className="text-foreground/70 text-sm leading-relaxed line-clamp-4 flex-grow mb-5">
                        {blog.content.replace(/\*\*/g, '').replace(/##/g, '').replace(/###/g, '').substring(0, 180)}...
                      </p>

                      {/* 🗑️ Added Delete Button */}
                      <div className="grid grid-cols-3 gap-3 mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openBlogDialog(blog)}
                        >
                          <Eye className="w-4 h-4 mr-1.5" /> Read
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              blog.content.replace(/\*\*/g, "").replace(/##/g, "").replace(/###/g, "")
                            )
                            alert("✓ Content copied!")
                          }}
                        >
                          <Copy className="w-4 h-4 mr-1.5" /> Copy
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Delete this blog?")) {
                              const updated = savedBlogs.filter((b) => b.id !== blog.id)
                              setSavedBlogs(updated)
                              localStorage.setItem("savedBlogs", JSON.stringify(updated))
                            }
                          }}
                        >
                          🗑️ Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link href="/generate">
                <Button size="lg" className="rounded-full px-10 py-6 text-base shadow-lg hover:shadow-xl transition-all">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Generate More Blogs
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Dialog for Reading Blog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-5 border-b sticky top-0 z-10 bg-white">
            <div className="flex items-start justify-between gap-4 mb-4">
              <Badge variant="secondary" className="text-xs px-3 py-1.5 font-semibold shrink-0">
                {selectedBlog?.topic}
              </Badge>
              <div className="flex items-center gap-2 text-xs text-foreground/60 bg-muted/50 px-3 py-1.5 rounded-full shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-medium whitespace-nowrap">
                  {selectedBlog && new Date(selectedBlog.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight text-left pr-8">
              {selectedBlog?.title.replace(/\*\*/g, '').replace(/##/g, '').replace(/###/g, '')}
            </DialogTitle>
          </DialogHeader>

          <DialogDescription asChild>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="prose prose-base max-w-none">
                {selectedBlog && formatContent(selectedBlog.content).map((paragraph, idx) => {
                  const cleanParagraph = paragraph.trim()
                  if (cleanParagraph.length < 80 && cleanParagraph.split(' ').length < 10 && idx > 0 && !cleanParagraph.endsWith('.')) {
                    return (
                      <h3 key={idx} className="text-lg md:text-xl font-bold text-foreground mt-6 mb-3 first:mt-0">
                        {cleanParagraph}
                      </h3>
                    )
                  }
                  return (
                    <p key={idx} className="text-foreground/80 leading-relaxed mb-4 text-sm md:text-base">
                      {cleanParagraph}
                    </p>
                  )
                })}
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Create Amazing Content?
            </h2>
            <p className="mt-4 text-lg text-foreground/60">
              Join thousands of content creators who trust our AI to generate high-quality blogs
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Link href="/generate">
                <Button size="lg" className="rounded-full px-10 py-6 text-base shadow-lg hover:shadow-xl transition-all">
                  Start Generating Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
