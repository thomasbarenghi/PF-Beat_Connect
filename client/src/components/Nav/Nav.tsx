'use client'
import { usePathname } from 'next/navigation'
import { NavModalItem } from '@/components'
import NavItem from './Item'

interface ItemProps {
  name: string
  url: string
  visible: boolean
}

interface NavProps {
  currentMode: 'light' | 'dark'
  center: boolean
  items: ItemProps[]
  horizontal: boolean
  withModal: boolean
  modalLabel?: string
  children?: any
  className?: string
  navClassName?: string
}

const Nav = ({
  currentMode,
  center,
  items,
  children,
  modalLabel,
  withModal,
  className,
  horizontal,
  navClassName
}: NavProps) => {
  const pathname = usePathname()
  const centerStyles = center ? 'absolute left-[50%]  w-max  translate-x-[-50%] ' : ''
  const navOrientation = horizontal ? 'flex-row' : 'flex-col'

  return (
    <>
      <nav className={`z-10  ${className} ${centerStyles}`}>
        <div className={`gap-6 ${navClassName} flex ${navOrientation}`}>
          {items?.map(
            (item: any) =>
              item.visible === true && (
                <NavItem item={item} currentMode={currentMode} pathname={pathname} key={item.name} />
              )
          )}
          {withModal && (
            <NavModalItem
              label={modalLabel ?? 'nulled'}
              labelClass='text-base-light text-white'
              currentMode={currentMode}
            >
              {children}
            </NavModalItem>
          )}
        </div>
      </nav>
    </>
  )
}

export default Nav
