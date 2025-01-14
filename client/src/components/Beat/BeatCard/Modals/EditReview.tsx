'use client'
import { MiniModalBox } from '@/components'
import Button from './Button'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setActiveBeatCreateReview, setActiveEditingReview } from '@/redux/slices/client/reviews'
import { type BeatsClass } from '@/interfaces'

interface Props {
  fromClient: boolean
  visibilityReviewEditBag: boolean
  boughtBeat: boolean
  reviewed: boolean
  beat: BeatsClass
  setVisibilityCreateReview: (visibility: boolean) => void
  setVisibilityEditReview: (visibility: boolean) => void
  isLogged: boolean
}

const EditReview = ({
  fromClient,
  visibilityReviewEditBag,
  boughtBeat,
  reviewed,
  beat,
  setVisibilityCreateReview,
  setVisibilityEditReview,
  isLogged
}: Props) => {
  const [t] = useTranslation('global')
  const dispatch = useAppDispatch()
  const userReviews = useAppSelector((state) => state.client.reviews.reviews)

  const currentReview = userReviews.find((review) => review.beat._id === beat._id)

  const handleCreateReview = () => {
    dispatch(setActiveBeatCreateReview(beat))
    setVisibilityCreateReview(true)
  }

  const handleEditReview = async () => {
    dispatch(setActiveEditingReview(currentReview))
    setVisibilityEditReview(true)
  }

  return (
    <>
      {!fromClient && visibilityReviewEditBag && boughtBeat && isLogged && (
        <div>
          <MiniModalBox className='right-1 top-1'>
            <div className='flex flex-col'>
              {boughtBeat && !reviewed && !fromClient && (
                <Button text={t('beatCar.createReview')} action={handleCreateReview} />
              )}
              {boughtBeat && reviewed && !fromClient && (
                <Button text={t('beatCar.editReview')} action={handleEditReview} />
              )}
            </div>
          </MiniModalBox>
        </div>
      )}
    </>
  )
}

export default EditReview
