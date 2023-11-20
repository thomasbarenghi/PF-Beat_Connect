'use client'
import { SellerDashboardLayout, IslandDashboard, AdminCreateReviewForm } from '@/components'
import { validateForm } from '@/utils/formLogic.utils'
import { useState, useEffect, useRef } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { fetchGenres } from '@/redux/slices/filters'
import { useTranslation } from 'react-i18next'

const SellerDashboardOverview = () => {
  const dispatch = useAppDispatch()
  const validateMode = 'review'
  const [fieldsToValidate] = useState([]) as any
  const [setErrors] = useState({}) as any
  const [t] = useTranslation('global')

  const [form] = useState({
    createdBy: '',
    beat: '',
    comment: '',
    title: '',
    rating: '',
    softDelete: false
  })

  useEffect(() => {
    dispatch(fetchGenres())
  }, [])

  useEffect(() => {
    setErrors(validateForm(form, fieldsToValidate, validateMode))
  }, [form, fieldsToValidate])

  const childRef = useRef<any>()

  const handleExternalSubmit = () => {
    childRef?.current?.submit()
  }

  return (
    <main>
      <SellerDashboardLayout
        topBarMode='action'
        topBarMessage={t('dashboardNav.createReview')}
        topBarButtonLabel={t('adminBeatsCreate.t1')}
        onClick={handleExternalSubmit}
      >
        <IslandDashboard className='flex flex-col gap-5 xl:gap-8 '>
          <AdminCreateReviewForm mode='create' ref={childRef} />
        </IslandDashboard>
      </SellerDashboardLayout>
    </main>
  )
}

export default SellerDashboardOverview
