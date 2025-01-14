'use client'
import { Logo, Nav, UserBoxNav, Hamburger, BecomeSeller, EditBeat, AdminHeaderBar, PostBeat } from '@/components'
import { ReactSVG } from 'react-svg'
import { useRouter } from 'next/navigation'
import { navPublicMobile, navHelp, navPublic } from './nav.lib'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { navBuilder, headerStyles } from './operation'

interface Props {
  setHamburguerVisible: (value: boolean) => void
  hamburguerVisible: boolean
}

const HamburguerIcon = ({ setHamburguerVisible, hamburguerVisible }: Props) => (
  <ReactSVG
    src='/icon/hamburguer.svg'
    className='dashboard-item__icon flex cursor-pointer fill-current text-white dark:text-white lg:hidden'
    onClick={() => {
      setHamburguerVisible(!hamburguerVisible)
    }}
  />
)

const Header = () => {
  const router = useRouter()
  const [t] = useTranslation('global')
  const [hamburguerVisible, setHamburguerVisible] = useState(false)
  const [headerClass, setHeaderClass] = useState<any>({})
  const [postBeatVisible, setPostBeatVisible] = useState(false)
  const [editBeatVisible, setEditBeatVisible] = useState(false)
  const [becomeSellerVisible, setBecomeSellerVisible] = useState(false)

  const navClient = navBuilder({
    t,
    setHamburguerVisible,
    setPostBeatVisible,
    setBecomeSellerVisible,
    router
  })

  const handleScroll = () => {
    window.scrollY > 100 ? setHeaderClass(headerStyles.alternative) : setHeaderClass(headerStyles.default)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <BecomeSeller visible={becomeSellerVisible} setVisible={setBecomeSellerVisible} />
      <PostBeat visible={postBeatVisible} setVisible={setPostBeatVisible} />
      <EditBeat visible={editBeatVisible} setVisible={setEditBeatVisible} />
      <header className='fixed z-30 flex  w-full justify-center items-center  flex-col' style={headerClass}>
        <AdminHeaderBar />
        <div className='padding-x-estilo2 relative py-8 flex items-center justify-between align-middle'>
          <Logo />
          <HamburguerIcon setHamburguerVisible={setHamburguerVisible} hamburguerVisible={hamburguerVisible} />
          <Nav
            items={navPublic}
            center
            withModal
            currentMode='dark'
            modalLabel={t('navModalItem.label')}
            className='hidden lg:flex'
            horizontal
          >
            <Nav
              items={navHelp}
              center={false}
              withModal={false}
              currentMode='light'
              modalLabel={t('navModalItem.label')}
              navClassName='flex !gap-2'
              horizontal={false}
            />
          </Nav>
          <UserBoxNav className='hidden lg:flex' navData={navClient} title='Centro de ayuda' />
        </div>
      </header>
      {hamburguerVisible && (
        <Hamburger
          options={navPublicMobile}
          userMenu={navClient}
          setHamburguerVisible={setHamburguerVisible}
          setBecomeSellerVisible={setBecomeSellerVisible}
          setPostBeatVisible={setPostBeatVisible}
        />
      )}
    </>
  )
}

export default Header
