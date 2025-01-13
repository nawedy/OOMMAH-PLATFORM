'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export function PrivacySettings() {
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [dataExportRequested, setDataExportRequested] = useState(false)

  const handleMarketingConsentChange = (checked: boolean) => {
    setMarketingConsent(checked)
  }

  const handleDataExportRequest = () => {
    setDataExportRequested(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Receive marketing communications</span>
          <Switch
            checked={marketingConsent}
            onCheckedChange={handleMarketingConsentChange}
          />
        </div>
        <div>
          <Button onClick={handleDataExportRequest} disabled={dataExportRequested}>
            {dataExportRequested ? 'Data export requested' : 'Request data export'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

