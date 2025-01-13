'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ContentItem {
  id: string
  type: 'post' | 'comment'
  content: string
  authorId: string
  createdAt: string
}

const mockContentItems: ContentItem[] = [
  {
    id: '1',
    type: 'post',
    content: 'This is a sample post that needs moderation.',
    authorId: 'user1',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'comment',
    content: 'This is a sample comment that needs moderation.',
    authorId: 'user2',
    createdAt: new Date().toISOString(),
  },
]

export function ContentModerationQueue() {
  const [contentItems, setContentItems] = React.useState(mockContentItems)

  const handleModeration = (id: string, action: 'approve' | 'reject') => {
    setContentItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-4">
      {contentItems.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.type.charAt(0).toUpperCase() + item.type.slice(1)} Moderation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{item.content}</p>
            <p className="text-xs text-gray-400 mt-2">Created at: {new Date(item.createdAt).toLocaleString()}</p>
            <div className="mt-4 space-x-2">
              <Button onClick={() => handleModeration(item.id, 'approve')} variant="outline">
                Approve
              </Button>
              <Button onClick={() => handleModeration(item.id, 'reject')} variant="outline">
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

