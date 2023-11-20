import { type UserClass } from '@/interfaces'
import { axiosPutter } from '@/services/axios.service'

export const updateUserData = async (clientId: string, data: UserClass) =>
  await axiosPutter({
    url: `user/${clientId}`,
    body: data,
    headers: {
      userid: clientId
    }
  })
