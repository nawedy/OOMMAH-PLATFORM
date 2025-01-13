'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Image, Link, Smile, Video } from 'lucide-react'

export function CreatePostForm() {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post creation
    setContent('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea 
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button type="button" variant="ghost" size="icon">
                <Image className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Link className="h-5 w-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            <Button type="submit">Post</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

