import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Select } from '@/components/ui/select'

export function LanguageSwitcher() {
  const router = useRouter()
  const { i18n } = useTranslation()

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value
    router.push(router.pathname, router.asPath, { locale })
  }

  return (
    <Select
      value={i18n.language}
      onChange={changeLanguage}
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </Select>
  )
}

