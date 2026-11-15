import { SearchX } from 'lucide-react'
import Button from '../components/common/Button'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound({ message = "The page you're looking for doesn't exist." }: { message?: string }) {
  usePageMeta('Page not found', 'The page you are looking for could not be found.')
  return (
    <div className="container-x flex flex-col items-center py-24 text-center">
      <SearchX className="h-16 w-16 text-brand/50" aria-hidden />
      <h1 className="mt-6 text-4xl">404 – Not Found</h1>
      <p className="mt-2 text-muted">{message}</p>
      <div className="mt-8 flex gap-3">
        <Button to="/">Back to Home</Button>
        <Button to="/products" variant="outline">Browse Products</Button>
      </div>
    </div>
  )
}
