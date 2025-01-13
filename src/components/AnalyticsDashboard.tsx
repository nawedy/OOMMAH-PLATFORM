'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart } from '@/components/charts/BarChart'
import { LineChart } from '@/components/charts/LineChart'

const mockUserGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'New Users',
      data: [100, 150, 200, 250, 300, 350],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
}

const mockEngagementData = {
  labels: ['Posts', 'Comments', 'Likes', 'Shares'],
  datasets: [
    {
      label: 'Engagement Count',
      data: [1000, 1500, 3000, 500],
      backgroundColor: 'rgba(153, 102, 255, 0.8)',
    },
  ],
}

export function AnalyticsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={mockUserGrowthData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Engagement by Feature</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={mockEngagementData} />
        </CardContent>
      </Card>
    </div>
  )
}

