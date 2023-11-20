import { axiosDeleter } from '@/services/axios.service'

export const deleteClientBeatRequest = async (beatId: string, userId: string) =>
  await axiosDeleter({
    url: `beats/${beatId}`,
    headers: {
      userid: userId
    }
  })
