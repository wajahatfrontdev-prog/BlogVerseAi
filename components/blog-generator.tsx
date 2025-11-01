"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import LoadingSpinner from "./loading-spinner"

interface BlogPost {
  id: string
  title: string
  content: string
  topic: string
  createdAt: string
}

export default function BlogGenerator() {
  const [topic, setTopic] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      })

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Clean title and content from markdown symbols
      const blogTitle = (data.title || `Insightful Article on ${topic}`).replace(/\*\*/g, '').replace(/##/g, '').trim()
      const rawContent = data.blog || data.response || data.content || "No content received from AI."
      
      // Remove all markdown formatting
      const blogContent = rawContent
        .replace(/\*\*/g, '')  // Remove bold markers
        .replace(/##/g, '')     // Remove heading markers
        .replace(/###/g, '')    // Remove subheading markers
        .replace(/\*/g, '')     // Remove any remaining asterisks
        .trim()

      const newBlog: BlogPost = {
        id: Date.now().toString(),
        title: blogTitle,
        content: blogContent,
        topic: topic,
        createdAt: new Date().toISOString(),
      }
      setBlogPost(newBlog)

      // Save to localStorage
      const savedBlogs = JSON.parse(localStorage.getItem('savedBlogs') || '[]')
      savedBlogs.unshift(newBlog)
      localStorage.setItem('savedBlogs', JSON.stringify(savedBlogs))
    } catch (error) {
      console.error("Error generating blog:", error)
      setError(error instanceof Error ? error.message : "Something went wrong while generating your blog.")
      
      // Create a proper error blog post
      const errorBlog: BlogPost = {
        id: Date.now().toString(),
        title: "Error Generating Blog",
        content: error instanceof Error ? error.message : "Something went wrong while generating your blog. Please try again.",
        topic: topic,
        createdAt: new Date().toISOString(),
      }
      setBlogPost(errorBlog)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setTopic("")
    setBlogPost(null)
    setError(null)
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-4">
            <label htmlFor="topic" className="block text-sm font-semibold text-foreground">
              Blog Topic
            </label>
            <div className="flex gap-2">
              <Input
                id="topic"
                type="text"
                placeholder="Enter a blog topic (e.g., AI, Web Development, Digital Marketing)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleGenerate()
                  }
                }}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleGenerate} disabled={isLoading || !topic.trim()} className="rounded-lg px-6">
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
            <p className="text-xs text-foreground/50">Tip: Be specific about your topic for better results</p>
          </div>
        </Card>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-border bg-gradient-to-r from-primary/5 to-transparent p-8">
              <div className="flex flex-col items-center gap-4">
                <LoadingSpinner />
                <div className="text-center">
                  <p className="font-semibold text-foreground">Creating your blog post...</p>
                  <p className="mt-2 text-sm text-foreground/60">Our AI is crafting unique, engaging content</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Post Output */}
      <AnimatePresence>
        {blogPost && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Card className={`border ${error ? 'border-red-300 bg-red-50' : 'border-border bg-white'} p-6 shadow-sm sm:p-8`}>
              <div className="space-y-4">
                <h2 className={`text-2xl font-bold ${error ? 'text-red-600' : 'text-foreground'}`}>
                  {blogPost.title}
                </h2>
                <Textarea
                  value={blogPost.content}
                  readOnly
                  className={`min-h-96 resize-none font-mono text-sm leading-relaxed ${
                    error ? 'bg-red-100 text-red-900' : 'bg-muted/50'
                  }`}
                />
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleClear} className="rounded-lg bg-transparent">
                    Generate Another
                  </Button>
                  {!error && (
                    <>
                      <Button
                        onClick={() => navigator.clipboard.writeText(blogPost.content)}
                        className="rounded-lg"
                      >
                        Copy to Clipboard
                      </Button>
                      <Button
                        onClick={() => {
                          const savedBlogs = JSON.parse(localStorage.getItem('savedBlogs') || '[]')
                          const updatedBlogs = savedBlogs.filter((b: BlogPost) => b.id !== blogPost.id)
                          localStorage.setItem('savedBlogs', JSON.stringify(updatedBlogs))
                          setBlogPost(null)
                          alert('Blog deleted from saved blogs!')
                        }}
                        variant="destructive"
                        className="rounded-lg"
                      >
                        Delete from Saved
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}