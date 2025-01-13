import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatWindow } from "@/components/ChatWindow"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Posts: 15</li>
              <li>Comments: 32</li>
              <li>Likes received: 78</li>
              <li>Events attended: 3</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Tech Meetup - June 15</li>
              <li>Community Picnic - June 20</li>
              <li>Webinar: Future of AI - June 25</li>
            </ul>
          </CardContent>
        </Card>
        <ChatWindow />
      </div>
    </div>
  )
}

