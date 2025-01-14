'use client'
import { BeatsGrid, ClientBeatsIndexer, Section, ReviewsGrid } from '@/components'
import { useAppSelector } from '@/redux/hooks'

const Beats = () => {
  const index = useAppSelector((state) => state?.beats?.generalActiveIndex)
  const { bougthBeats, ownedBeats, favoriteBeats } = useAppSelector((state) => state?.client?.beats)
  const beats = [bougthBeats, ownedBeats, favoriteBeats]

  return (
    <Section subClassName='padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col'>
      <ClientBeatsIndexer />
      {index >= 0 && index <= 2 ? <BeatsGrid beats={beats[index]} /> : <ReviewsGrid />}
    </Section>
  )
}

export default Beats
