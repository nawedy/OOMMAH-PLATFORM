'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: 1, sender: 'John', content: 'Hey, how are you?', timestamp: '10:00 AM' },
  { id: 2, sender: 'You', content: 'I\'m good, thanks! How about you?', timestamp: '10:02 AM' },
  { id: 3, sender: 'John', content: 'Doing well! Did you see the new event posted?', timestamp: '10:05 AM' },
]

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Chat with John</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {messages.map((message) => (
            <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}>
              <p className="text-sm font-semibold">{message.sender}</p>
              <p className="bg-muted p-2 rounded-lg inline-block">{message.content}</p>
              <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

