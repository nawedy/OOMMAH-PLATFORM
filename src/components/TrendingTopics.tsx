import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from 'lucide-react'

const TRENDING_TOPICS = [
  { id: 1, name: 'Technology', posts: 1234 },
  { id: 2, name: 'Design', posts: 890 },
  { id: 3, name: 'Programming', posts: 567 },
  { id: 4, name: 'AI', posts: 432 },
]

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {TRENDING_TOPICS.map(topic => (
            <div key={topic.id} className="flex items-center justify-between">
              <span>#{topic.name}</span>
              <span className="text-sm text-muted-foreground">{topic.posts} posts</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

