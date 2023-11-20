'use client'
import { SellerDashboardLayout, IslandDashboard, AdminCreateBeatForm } from '@/components'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

const AdminUserCreate = () => {
  const [t] = useTranslation('global')
  const childRef = useRef<HTMLFormElement | null>(null)

  const handleExternalSubmit = () => {
    childRef?.current?.submit()
  }

  return (
    <SellerDashboardLayout
      topBarMode='action'
      topBarMessage={t('dashboardNav.createBeat')}
      topBarButtonLabel={t('adminBeatsCreate.t1')}
      onClick={handleExternalSubmit}
    >
      <IslandDashboard className='flex flex-col gap-5 xl:gap-8 '>
        <AdminCreateBeatForm mode='create' ref={childRef} />
      </IslandDashboard>
    </SellerDashboardLayout>
  )
}

export default AdminUserCreate
