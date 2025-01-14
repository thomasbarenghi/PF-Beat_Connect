'use client'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { addToCart } from '@/redux/slices/cart'
import { BeatReviewPopup } from '@/components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BeatDetailBox from './DetailBox'
import BeatDataBox from './DataBox'
import Audio from '../BeatCard/Audio'

const BeatDetailSideBar = () => {
  const dispatch = useAppDispatch()
  const [t, i18n] = useTranslation('global')
  const [showModalReview, setShowModalReview] = useState(false)
  const { bougthBeats } = useAppSelector((state) => state?.client?.beats)
  const currentBeat = useAppSelector((state) => state?.beats?.activeItemDetail)
  const hasReview = currentBeat?.review?.length > 0
  const buyed = Boolean(bougthBeats.find((beat) => beat?._id === currentBeat?._id))

  const authorId = currentBeat?.userCreator?._id ? currentBeat?.userCreator?._id : currentBeat?.userCreator

  const handleModalReview = () => {
    setShowModalReview(!showModalReview)
  }

  const dynamicBeatDetailBox = [
    {
      msg1: i18n.language === 'en' ? 'Free License, MP3' : 'Licencia Gratuita, MP3',
      msg2: '$0.00',
      beat: currentBeat.audioMP3,
      type: 'free'
    },
    {
      msg1: i18n.language === 'en' ? 'Standart License, WAV' : 'Licencia Estándar, WAV',
      msg2: `$${currentBeat.priceAmount}`,
      beat: currentBeat.audioWAV,
      type: buyed ? 'buyed' : 'paid'
    }
  ]

  return (
    <>
      <div id='detailBox' className='flex flex-col gap-8 px-4  sm:px-9 sm:pt-8'>
        <BeatDataBox beat={currentBeat} />
        <div className='flex flex-col gap-3'>
          <p className=' color-primary-red-700  text-sm font-medium'>{t('beatDetailSideBar.t1')}</p>
          <div className=' flex flex-col gap-4'>
            {dynamicBeatDetailBox.map((box) => (
              <div key={box.msg1}>
                <BeatDetailBox
                  msg1={box.msg1}
                  msg2={box.msg2}
                  key={box.msg1}
                  beat={currentBeat}
                  type={box.type}
                  hasReview={hasReview}
                  handleModalReview={handleModalReview}
                />
                <hr className='mt-4 border-slate-200' />
              </div>
            ))}
          </div>
          <Audio beat={currentBeat} />
          {!buyed ? (
            <button
              className='background-primary-red-700 color-neutral-white mt-2 rounded-full px-5 py-3 text-sm font-semibold'
              onClick={() => {
                dispatch(addToCart({ authorId, beat: currentBeat }))
              }}
            >
              {t('beatDetailSideBar.t3')}
            </button>
          ) : (
            <a
              className='background-primary-red-700 color-neutral-white mt-2 rounded-full px-5 py-3 text-sm font-semibold text-center'
              download={currentBeat.name}
              href={currentBeat.audioWAV}
            >
              {t('beatDetailSideBar.t2')}
            </a>
          )}
        </div>
      </div>
      <BeatReviewPopup modal={showModalReview} handleModalReview={handleModalReview} />
    </>
  )
}

export default BeatDetailSideBar
