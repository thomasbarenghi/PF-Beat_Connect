import { axiosGetter } from '@/services/axios.service'

export const fetchUserData = async (clientId: string) =>
  await axiosGetter({
    url: `user/${clientId}`
  })
