'use client'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import global_es from '../../lenguage/es/global.json'
import global_en from '../../lenguage/en/global.json'

interface Props {
  children: React.ReactNode
}

i18next.init({
  interpolation: {
    escapeValue: false
  },
  lng: 'es',
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    }
  }
})

const I18nProvider = ({ children }: Props) => <I18nextProvider i18n={i18next}>{children}</I18nextProvider>

export default I18nProvider
