export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-muted rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-6 bg-muted rounded w-1/4"></div>
              <div className="h-12 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
