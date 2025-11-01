import BlogGenerator from "@/components/blog-generator"

export default function GeneratePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AI Blog Generator
          </h1>
          <p className="mt-4 text-lg text-foreground/60">
            Enter a topic and let our AI create a captivating blog post for you
          </p>
        </div>
        <BlogGenerator />
      </div>
    </main>
  )
}
