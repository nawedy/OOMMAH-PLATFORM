import React from 'react'
import { render, screen } from '@testing-library/react'
import { Navigation } from '../Navigation'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
    }
  },
}))

jest.mock('next-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation />)
    
    expect(screen.getByText('home')).toBeInTheDocument()
    expect(screen.getByText('groups')).toBeInTheDocument()
    expect(screen.getByText('events')).toBeInTheDocument()
    expect(screen.getByText('marketplace')).toBeInTheDocument()
  })

  it('sets aria-current for the current page', () => {
    render(<Navigation />)
    
    const homeLink = screen.getByText('home')
    expect(homeLink).toHaveAttribute('aria-current', 'page')
  })
})

