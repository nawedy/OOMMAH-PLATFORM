import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">John Doe</CardTitle>
              <p className="text-muted-foreground">@johndoe</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Bio</h3>
              <p>Passionate about technology and community building. Love to connect with like-minded individuals!</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>San Francisco, CA</p>
            </div>
            <div>
              <h3 className="font-semibold">Joined</h3>
              <p>January 2023</p>
            </div>
            <Button>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

