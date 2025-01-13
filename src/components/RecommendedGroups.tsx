import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from 'lucide-react'

const GROUPS = [
  { id: 1, name: 'Tech Enthusiasts', members: 1234 },
  { id: 2, name: 'Digital Artists', members: 890 },
  { id: 3, name: 'Startup Founders', members: 567 },
]

export function RecommendedGroups() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Recommended Groups
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {GROUPS.map(group => (
            <div key={group.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{group.name}</p>
                <p className="text-sm text-muted-foreground">{group.members} members</p>
              </div>
              <Button variant="outline" size="sm">Join</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

