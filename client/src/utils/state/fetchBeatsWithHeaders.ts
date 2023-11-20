import { axiosGetter } from '@/services/axios.service'

export const fetchBeatsWithHeaders = async (queryString: string) =>
  await axiosGetter({
    url: `beats${queryString}`
  })
