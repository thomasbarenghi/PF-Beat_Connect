import { axiosPutter } from '@/services/axios.service'

export const updateClientBeat = async (formData: FormData, beatId: string, userId: string) =>
  await axiosPutter({
    url: `beats/${beatId}`,
    body: formData,
    headers: {
      userid: userId,
      'Content-Type': 'multipart/form-data'
    }
  })
