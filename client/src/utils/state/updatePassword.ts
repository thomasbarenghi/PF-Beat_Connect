import { axiosPutter } from '@/services/axios.service'

export const updatePassword = async (clientId: string, formData: FormData) => {
  await axiosPutter({
    url: `user/${clientId}`,
    body: formData,
    headers: {
      userid: clientId
    }
  })
}
