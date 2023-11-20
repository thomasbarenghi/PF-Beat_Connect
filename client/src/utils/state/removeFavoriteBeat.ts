import { axiosPutter } from '@/services/axios.service'

export const removeFavoriteBeat = async (formData: FormData, userId: string) =>
  await axiosPutter({
    url: `user/${userId}`,
    body: formData,
    headers: {
      userid: userId
    }
  })
