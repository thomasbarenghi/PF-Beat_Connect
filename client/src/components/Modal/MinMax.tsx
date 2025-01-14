'use client'
import { useState, useRef, useEffect } from 'react'
import { MiniModalBox, ArrowLabel, MinMax } from '@/components'

interface Props {
  seleccionados: any
  setSeleccionados: (seleccionados: any) => void
  label: string
}

const ModalMinMax = ({ seleccionados, setSeleccionados, label }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false)
    }
  }

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div ref={dropdownRef} id='dropdown'>
      <ArrowLabel label={label} handleDropdownClick={handleDropdownClick} iconStatus />
      <div className='absolute'>
        {isDropdownOpen && (
          <MiniModalBox>
            <MinMax seleccionados={seleccionados} setSeleccionados={setSeleccionados} label={label} />
          </MiniModalBox>
        )}
      </div>
    </div>
  )
}

export default ModalMinMax
