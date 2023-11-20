'use client'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { deleteFromCart } from '@/redux/slices/cart'
import { type BeatsClass } from '@/interfaces'
import BeatImage from '../Beat/BeatCard/Image'
import Title from '../Beat/BeatCard/Title'
import Price from '../Beat/BeatCard/Price'
import AuthorName from '../Beat/BeatCard/Author'

interface MiniCartItemProps {
  producto: BeatsClass
}

const MiniCartItem = ({ producto }: MiniCartItemProps) => {
  const dispatch = useDispatch()
  return (
    <>
      <div className='relative'>
        <div className='bg-red-700 p-2 rounded-full absolute  right-2 top-0 mb-0 mt-0 cursor-pointer'>
          <Image
            src='/icon/cross-white.svg'
            alt='delete'
            width={10}
            height={10}
            className=' '
            onClick={() => dispatch(deleteFromCart({ id: producto._id }))}
          />
        </div>
        <div className='flex flex-row items-center justify-start gap-2 align-middle'>
          <div className='flex items-center gap-2 pr-8'>
            <BeatImage beat={producto} height={80} width={80} />
            <MiniCartTextBox producto={producto} />
          </div>
        </div>
      </div>
    </>
  )
}

const MiniCartTextBox = ({ producto }: MiniCartItemProps) => (
  <div>
    <Title beat={producto} />
    <Price beat={producto} />
    <AuthorName beat={producto} />
  </div>
)

export default MiniCartItem
