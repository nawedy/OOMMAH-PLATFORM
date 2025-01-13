'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const mockSubscribers = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
]

const mockCampaigns = [
  { id: '1', name: 'Welcome Campaign' },
  { id: '2', name: 'Monthly Newsletter' },
]

export function EmailMarketingManager() {
  const [newSubscriber, setNewSubscriber] = useState({ email: '', name: '' })
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [subscribers, setSubscribers] = useState(mockSubscribers)

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribers([...subscribers, { id: Date.now().toString(), ...newSubscriber }])
    setNewSubscriber({ email: '', name: '' })
  }

  const handleSendCampaign = () => {
    if (selectedCampaign) {
      alert(`Campaign ${selectedCampaign} sent to all subscribers!`)
      setSelectedCampaign('')
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Subscriber</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddSubscriber} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={newSubscriber.email}
              onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="Name"
              value={newSubscriber.name}
              onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
              required
            />
            <Button type="submit">Add Subscriber</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Send Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
            <SelectTrigger>
              <SelectValue placeholder="Select a campaign" />
            </SelectTrigger>
            <SelectContent>
              {mockCampaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSendCampaign} className="mt-4" disabled={!selectedCampaign}>
            Send Campaign
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {subscribers.map((subscriber) => (
              <li key={subscriber.id}>{subscriber.name} ({subscriber.email})</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

