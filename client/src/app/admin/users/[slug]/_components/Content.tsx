'use client'
import { SellerDashboardLayout, IslandDashboard, AdminCreateUserForm } from '@/components'

import { useTranslation } from 'react-i18next'
import { useRef } from 'react'

const AdminUserCreate = () => {
  const [t] = useTranslation('global')
  const childRef = useRef<HTMLFormElement | null>(null)

  const handleExternalSubmit = () => {
    if (!childRef.current) return
    childRef.current.submit()
  }

  return (
    <main>
      <SellerDashboardLayout
        topBarMode='action'
        topBarMessage={t('adminBeatsCreate.title2')}
        topBarButtonLabel={t('adminBeatsCreate.t1')}
        onClick={handleExternalSubmit}
      >
        <IslandDashboard className='flex flex-col gap-5 xl:gap-8 '>
          <AdminCreateUserForm mode='edit' ref={childRef} />
        </IslandDashboard>
      </SellerDashboardLayout>
    </main>
  )
}

export default AdminUserCreate
