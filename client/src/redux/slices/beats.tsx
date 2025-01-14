'use client'
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import {
  buildQueryString,
  fetchBeatsWithHeaders,
  filterSoftDeletedReviews,
  fetchFeaturedBeatsData
} from '@/utils/state'
import { axiosGetter } from '@/services/axios.service'
import { type BeatsClass, type ReviewsClass } from '@/interfaces'

const initialState = {
  loadingBeats: false,
  publicItems: [] as BeatsClass[],
  activeItems: [] as BeatsClass[],
  featuredItems: [] as BeatsClass[],
  activeItemDetail: {} as any,
  generalActiveIndex: 0,
  activeReviewDetail: [] as ReviewsClass[],
  reviewFetchStatus: false,
  currentAuthor: {} as any,
  currentAuthorBeats: [] as BeatsClass[],
  loadingcurrentAuthor: false,
  pageIndex: 1,
  pages: {
    next: null,
    prev: null,
    current: 1,
    limit: null
  }
}

export const fetchBeats = createAsyncThunk('beats/fetchBeats', async (filters: any) => {
  try {
    const queryString = buildQueryString(filters)
    const response = await fetchBeatsWithHeaders(queryString)
    const beatsWithFilteredReviews = filterSoftDeletedReviews(response.docs)
    return {
      docs: beatsWithFilteredReviews,
      next: response.nextPage,
      prev: response.prevPage,
      current: response.page,
      limit: response.totalPages
    }
  } catch (err) {
    console.error('fetchBeats', err)
    throw err
  }
})

export const fetchFeaturedBeats = createAsyncThunk('beats/fetchFeaturedBeats', async () => {
  try {
    const response = await fetchFeaturedBeatsData()
    const beatsWithFilteredReviews = filterSoftDeletedReviews(response.docs)
    return {
      docs: beatsWithFilteredReviews
    }
  } catch (err) {
    console.error('fetchFeaturedBeats', err)
    throw err
  }
})

export const fetchCurrentAuthor = createAsyncThunk('beats/fetchCurrentAuthor', async (id: string) => {
  const response = await axiosGetter({
    url: `user/${id}`
  })
  const { firstName, lastName, id: idR, image, username, bio, backImage } = response
  const currentAuthor = {
    firstName,
    lastName,
    id: idR,
    image,
    username,
    bio,
    backImage
  }
  return { beats: response.createdBeats, currentAuthor }
})

// -------------------- SLICE -------------------//
const beatsSlice = createSlice({
  name: 'beats',
  initialState,
  reducers: {
    setActiveItemDetail: (state, action) => {
      state.activeItemDetail = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pageIndex = action.payload
      state.pages.current = action.payload
    },
    setGeneralActiveIndex: (state, action: PayloadAction<number>) => {
      state.generalActiveIndex = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeats.pending, (state) => {
        state.loadingBeats = true
      })
      .addCase(fetchBeats.fulfilled, (state, action) => {
        const { docs, next, prev, current, limit } = action.payload
        if (!Array.isArray(action.payload.docs) || docs.length === 0) {
          state.publicItems = []
          state.activeItems = []
          return
        }
        state.publicItems = docs || []
        state.activeItems = docs || []
        state.pages.next = next
        state.pages.prev = prev
        state.pages.current = current
        state.pages.limit = limit
        state.loadingBeats = false
      })
      .addCase(fetchBeats.rejected, (state, action) => {
        console.error(' fetch error', action.error)
      })
      .addCase(fetchCurrentAuthor.pending, (state, action) => {
        state.loadingcurrentAuthor = true
      })
      .addCase(fetchCurrentAuthor.fulfilled, (state, action) => {
        const { beats, currentAuthor } = action.payload
        state.currentAuthor = currentAuthor as any
        state.currentAuthorBeats = beats
        state.loadingcurrentAuthor = false
      })
      .addCase(fetchCurrentAuthor.rejected, (state, action) => {
        console.error(action.error)
      })
      .addCase(fetchFeaturedBeats.pending, (state, action) => {
        state.loadingBeats = true
      })
      .addCase(fetchFeaturedBeats.fulfilled, (state, action) => {
        const { docs } = action.payload
        state.featuredItems = docs || []
      })
      .addCase(fetchFeaturedBeats.rejected, (state, action) => {
        console.error(' etch error', action.error)
      })
  }
})

export const { setActiveItemDetail, setGeneralActiveIndex, setCurrentPage } = beatsSlice.actions

export default beatsSlice.reducer
