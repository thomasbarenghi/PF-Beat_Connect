'use client'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useState } from 'react'
import { UserBoxNav } from '@/components'
import { motion, AnimatePresence } from 'framer-motion'
import { navBuilder } from './Header/operation'
import { useRouter } from 'next/navigation'

export const navHelp = [
  {
    name: 'navHelp.t1',
    url: '/help',
    visible: true
  },
  {
    name: 'navHelp.t2',
    url: '/help/privacy',
    visible: true
  },
  {
    name: 'navHelp.t3',
    url: '/help/terms',
    visible: true
  }
]

interface Props {
  options: any[]
  setHamburguerVisible: (value: boolean) => void
  setPostBeatVisible: (value: boolean) => void
  setBecomeSellerVisible: (value: boolean) => void
  userMenu: any[]
}

const Hamburger = ({ options, setHamburguerVisible, userMenu, setPostBeatVisible, setBecomeSellerVisible }: Props) => {
  const router = useRouter()
  const [pageIndex, setPageIndex] = useState(0)
  const [t] = useTranslation('global')

  const navClient = navBuilder({
    t,
    setHamburguerVisible,
    setPostBeatVisible,
    setBecomeSellerVisible,
    router
  })

  return (
    <>
      <AnimatePresence>
        <motion.div
          className='fixed top-0 z-[100] h-screen w-screen '
          style={{
            background: '#000000b3',
            backdropFilter: 'blur(10px)',
            top: 0
          }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        >
          <div className=' absolute left-0 top-0 z-40 flex w-screen items-center justify-between px-4 xs:px-8 py-6 '>
            <UserBoxNav navData={navClient} title='Centro de ayuda' />

            <img
              onClick={() => {
                setHamburguerVisible(false)
                setPageIndex(0)
              }}
              className=' z-40 h-6 w-6 cursor-pointer '
              src='/icon/cross-white.svg'
              alt='close'
            />
          </div>

          <div className='flex h-full flex-col items-start justify-center gap-1 px-4 py-16 xs:px-8'>
            {pageIndex === 0 && (
              <div className='flex flex-col gap-4 '>
                {options.map((item, index) => (
                  <Link
                    href={item.url}
                    key={index}
                    onClick={() => {
                      setHamburguerVisible(false)
                    }}
                  >
                    <div className='cursor-pointer'>
                      <h1 className='text-titulo1-medium text-white'>{t(item.name)}</h1>
                    </div>
                  </Link>
                ))}

                <div className='cursor-pointer'>
                  <h1
                    className='text-titulo1-medium text-white'
                    onClick={() => {
                      setPageIndex(1)
                    }}
                  >
                    {t('hamburguer.t1')}
                  </h1>
                </div>
              </div>
            )}
            {pageIndex === 1 && (
              <div>
                <p
                  className='text-base-medium mb-4 cursor-pointer text-white'
                  onClick={() => {
                    setPageIndex(0)
                  }}
                >
                  {t('hamburguer.t2')}
                </p>
                <div className='flex flex-col gap-4 '>
                  {pageIndex === 1 &&
                    navHelp.map((item, index: number) => (
                      <Link
                        href={item.url}
                        key={index}
                        onClick={() => {
                          setHamburguerVisible(false)
                        }}
                      >
                        <div className='cursor-pointer'>
                          <h1 className='text-titulo1-medium text-white'>{t(item.name)}</h1>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Hamburger
