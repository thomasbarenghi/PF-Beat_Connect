'use client'
import { SellerDashboardLayout, IslandDashboard, AdminCreateUserForm } from '@/components'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

const AdminUserCreate = () => {
  const [t] = useTranslation('global')
  const childRef = useRef<HTMLFormElement | null>(null)

  const handleExternalSubmit = () => {
    if (!childRef.current) return
    childRef.current.submit()
  }

  return (
    <SellerDashboardLayout
      topBarMode='action'
      topBarMessage={t('dashboardNav.createUser')}
      topBarButtonLabel={t('adminBeatsCreate.t1')}
      onClick={handleExternalSubmit}
    >
      <IslandDashboard className='flex flex-col gap-5 xl:gap-8 '>
        <AdminCreateUserForm mode='create' ref={childRef} />
      </IslandDashboard>
    </SellerDashboardLayout>
  )
}

export default AdminUserCreate
