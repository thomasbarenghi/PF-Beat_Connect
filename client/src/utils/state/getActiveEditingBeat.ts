import { type RootState } from '@/redux/store/store'

export const getActiveEditingBeat = (getState: any) => {
  const state = getState() as RootState
  const activeEditingBeatId = state?.client?.beats?.activeEditingBeat?._id
  return { activeEditingBeatId }
}
