'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share } from 'lucide-react'

const POSTS = [
  {
    id: '1',
    author: {
      name: 'Sarah Wilson',
      image: '/placeholder.svg?height=40&width=40',
      handle: '@sarahw'
    },
    content: 'Just launched my new project! So excited to share it with everyone. Check it out and let me know what you think! 🚀',
    likes: 24,
    comments: 5,
    shares: 2,
    timeAgo: '2h'
  },
  {
    id: '2',
    author: {
      name: 'Alex Thompson',
      image: '/placeholder.svg?height=40&width=40',
      handle: '@alexthompson'
    },
    content: 'Beautiful day for a hike! Nature always helps me clear my mind and find new inspiration. 🏔️ #outdoors #mindfulness',
    likes: 156,
    comments: 12,
    shares: 4,
    timeAgo: '4h'
  },
  // Add more posts as needed
]

export function PostList() {
  return (
    <div className="space-y-4">
      {POSTS.map(post => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={post.author.image} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.author.handle} · {post.timeAgo}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{post.content}</p>
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share className="h-4 w-4" />
                {post.shares}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

