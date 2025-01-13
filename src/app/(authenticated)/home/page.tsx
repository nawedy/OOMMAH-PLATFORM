import { CreatePostForm } from "@/components/CreatePostForm"
import { PostList } from "@/components/PostList"
import { TrendingTopics } from "@/components/TrendingTopics"
import { RecommendedGroups } from "@/components/RecommendedGroups"
import { UpcomingEvents } from "@/components/UpcomingEvents"

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <CreatePostForm />
        <PostList />
      </div>
      <div className="space-y-8">
        <TrendingTopics />
        <RecommendedGroups />
        <UpcomingEvents />
      </div>
    </div>
  )
}

