import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export function Navigation() {
  const router = useRouter()
  const { t } = useTranslation('common')

  const navItems = [
    { href: '/home', label: 'home' },
    { href: '/groups', label: 'groups' },
    { href: '/events', label: 'events' },
    { href: '/marketplace', label: 'marketplace' },
  ]

  return (
    <nav aria-label="Main navigation">
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={router.pathname === item.href ? 'page' : undefined}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                router.pathname === item.href
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {t(item.label)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

