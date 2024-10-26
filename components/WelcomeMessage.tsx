import React from 'react'
import { getI18n } from '@/lib/i18n/config'

export async function WelcomeMessage() {
  const t = await getI18n()
  return <h1>{t('welcome', { count: 1 })}</h1>
}
