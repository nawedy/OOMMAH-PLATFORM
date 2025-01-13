import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"

const notifications = [
  { id: 1, content: 'John Doe liked your post', time: '2 minutes ago' },
  { id: 2, content: 'New event in your area', time: '1 hour ago' },
  { id: 3, content: 'You have a new follower', time: '3 hours ago' },
]

export function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id}>
            <div className="flex flex-col">
              <span>{notification.content}</span>
              <span className="text-sm text-muted-foreground">{notification.time}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

