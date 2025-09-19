export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3 mb-6"></div>
          <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-48 bg-muted rounded-lg"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
