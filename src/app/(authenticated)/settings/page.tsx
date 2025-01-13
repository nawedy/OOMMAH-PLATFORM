'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [publicProfile, setPublicProfile] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)
  const { toast } = useToast()

  const handleSaveSettings = () => {
    // Here you would typically save the settings to the backend
    console.log('Saving settings:', { publicProfile, emailNotifications, dataSharing })
    toast({
      title: "Settings saved",
      description: "Your privacy settings have been updated.",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="public-profile">Public Profile</Label>
            <Switch
              id="public-profile"
              checked={publicProfile}
              onCheckedChange={setPublicProfile}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="data-sharing">Data Sharing with Third Parties</Label>
            <Switch
              id="data-sharing"
              checked={dataSharing}
              onCheckedChange={setDataSharing}
            />
          </div>
          <Button onClick={handleSaveSettings} className="mt-4">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}

