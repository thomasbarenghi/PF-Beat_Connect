import './globals.scss'
import Querier from '@/services/querier.service'
import { Toaster } from 'sonner'
import I18nProvider from '@/context/providers/i18n.provider'
import dynamic from 'next/dynamic'
import { Outfit } from 'next/font/google'
const Hoc = dynamic(async () => await import('@/context/providers/hoc.provider'), {
  ssr: false
})
const ReduxProvider = dynamic(async () => await import('@/context/providers/redux.provider'), {
  ssr: false
})

interface Props {
  children: React.ReactNode
}

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700']
})

const RootLayout = (props: Props) => (
  <html lang='es'>
    <head />
    <body className={outfit.className}>
      <I18nProvider>
        <ReduxProvider>
          <Querier>
            <Hoc>
              <Toaster
                richColors
                position='bottom-left'
                toastOptions={{
                  className: 'max-w-[85vw] xs:max-w-none z-50 '
                }}
              />
              {props.children}
            </Hoc>
          </Querier>
        </ReduxProvider>
      </I18nProvider>
    </body>
  </html>
)

export default RootLayout
