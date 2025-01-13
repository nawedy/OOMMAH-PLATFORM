import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Custom404() {
  const router = useRouter()
  const { t } = useTranslation('common')

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{t('404.title')}</h1>
      <p className="mb-4">{t('404.description')}</p>
      <Link href="/" className="text-blue-500 hover:underline">
        {t('404.backToHome')}
      </Link>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

