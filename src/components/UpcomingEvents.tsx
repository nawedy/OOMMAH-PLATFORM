import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from 'lucide-react'

const EVENTS = [
  { 
    id: 1, 
    name: 'Tech Meetup 2024',
    date: 'Jan 15, 2024',
    attendees: 45
  },
  { 
    id: 2, 
    name: 'Design Workshop',
    date: 'Jan 20, 2024',
    attendees: 30
  },
  { 
    id: 3, 
    name: 'Startup Networking',
    date: 'Jan 25, 2024',
    attendees: 60
  },
]

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {EVENTS.map(event => (
            <div key={event.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">{event.name}</p>
                <Button variant="outline" size="sm">RSVP</Button>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{event.date}</span>
                <span>{event.attendees} attending</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

