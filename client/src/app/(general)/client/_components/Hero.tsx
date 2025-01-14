'use client'
import { Hero, ProfileCard } from '@/components'
import { useAppSelector } from '@/redux/hooks'

const HeroSection = () => {
  const currentUser = useAppSelector((state) => state?.client?.authSession?.session?.current)
  return (
    <Hero
      style={{ height: '45vh' }}
      image={currentUser.backImage}
      imageAlt='hero'
      className='items-center justify-center align-middle'
      subClassName='padding-x-estilo2 flex h-full w-full flex-col !justify-end pb-8'
    >
      <ProfileCard
        profilePhoto={currentUser.image}
        profileName={`${currentUser.firstName}${' '}${currentUser.lastName}`}
        profileMessage={currentUser.bio}
      />
    </Hero>
  )
}

export default HeroSection
