import { axiosPutter } from '@/services/axios.service'

export const updateUserData = async (clientId: string, data: any) =>
  await axiosPutter({
    url: `user/${clientId}`,
    body: data,
    headers: {
      userid: clientId
    }
  })
