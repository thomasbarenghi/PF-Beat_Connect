import { axiosGetter } from '@/services/axios.service'

export const fetchFeaturedBeatsData = async () =>
  await axiosGetter({
    url: 'beats?relevance=desc&limit=5'
  })
