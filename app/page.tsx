import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to Visa Application Platform
      </h1>
      <p className="text-xl text-center text-muted-foreground mb-8">
        Streamlined visa application process for multiple countries
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/visa">Browse Visas</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Track Application</Link>
        </Button>
      </div>
    </div>
  )
}