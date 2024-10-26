// lib/i18n/config.ts
import { createI18nServer } from 'next-international/server'
import React from 'react'

export const { getI18n, getScopedI18n, getCurrentLocale } = createI18nServer({
  en: () => import('./en').then((module) => module.default),
  es: () => import('./es').then((module) => module.default),
  ar: () => import('./ar').then((module) => module.default),
  zh: () => import('./zh').then((module) => module.default),
})

// Components can use translations
export async function WelcomeMessage() {
  const t = await getI18n()
  return React.createElement('h1', null, t('welcome', { count: 1 }))
}
