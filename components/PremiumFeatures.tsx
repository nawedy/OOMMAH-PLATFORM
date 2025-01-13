"use client"

import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function PremiumFeatures() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleUpgrade = () => {
    router.push('/subscription/upgrade')
  }

  if (session?.user?.subscription?.plan === 'premium') {
    return (
      <Card className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
        <CardHeader>
          <CardTitle>Premium Features</CardTitle>
          <CardDescription className="text-white/90">
            You have access to all premium features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Ad-free experience</li>
            <li>Priority customer support</li>
            <li>Exclusive content access</li>
            <li>Advanced analytics</li>
          </ul>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upgrade to Premium</CardTitle>
        <CardDescription>
          Get access to exclusive features and benefits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="list-disc list-inside space-y-2">
          <li>Ad-free experience</li>
          <li>Priority customer support</li>
          <li>Exclusive content access</li>
          <li>Advanced analytics</li>
        </ul>
        <Button onClick={handleUpgrade} className="w-full">
          Upgrade Now
        </Button>
      </CardContent>
    </Card>
  )
}

