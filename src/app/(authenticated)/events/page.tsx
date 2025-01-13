import { EventList } from "@/components/EventList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button asChild>
          <Link href="/events/create">Create Event</Link>
        </Button>
      </div>
      <EventList />
    </div>
  )
}

