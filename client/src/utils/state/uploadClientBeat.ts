import { type BeatsClass } from '@/interfaces'
import { axiosPoster } from '@/services/axios.service'

export const uploadClientBeat = async (data: BeatsClass, userId: string) =>
  await axiosPoster({
    url: 'beats',
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      userid: userId
    }
  })
