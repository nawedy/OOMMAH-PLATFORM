import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/home')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to Oommah</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Connect, share, and grow with like-minded individuals in your community.
        Join Oommah today and experience a new way of social networking.
      </p>
      <div className="space-x-4">
        <Button asChild size="lg">
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </div>
  )
}

