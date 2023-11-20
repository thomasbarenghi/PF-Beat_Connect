import { type RootState } from '@/redux/store/store'

export const getUserIdFromState = (getState: any) => {
  const state = getState() as RootState
  return state?.client?.authSession?.session?.current?._id
}
