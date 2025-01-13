'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export function LandingPageClient() {
  const someReduxState = useSelector((state: RootState) => state.someSlice.someValue)

  return (
    <div>
      {/* Use Redux state here */}
      <p>Redux state: {someReduxState}</p>
    </div>
  )
}

