import { type BeatsClass, type ReviewsClass } from '@/interfaces'
import { createUserSession } from '../createUserSession.utils'

export const processUserData = (response: any) => {
  const bougthBeats = processBeats(response.bougthBeats)
  const ownedBeats = processBeats(response.createdBeats)
  const ownedReviews = processReviews(response.userReviews)
  const orders = response.userOrders
  const favoriteBeats = processBeats(response.userFavorites)

  const auth = {
    isSeller: response.isSeller,
    isAdmin: response.superAdmin
  }

  const session = createUserSession(response)

  return {
    auth,
    session,
    bougthBeats,
    ownedBeats,
    ownedReviews,
    orders,
    favoriteBeats
  }
}

const processBeats = (beats: BeatsClass[]) =>
  beats
    .filter((beat: BeatsClass) => !beat.softDelete)
    .map((beat: BeatsClass) => ({
      ...beat,
      review: processReviews(beat.review)
    })) as BeatsClass[]

const processReviews = (reviews: ReviewsClass[]) => reviews.filter((review: ReviewsClass) => !review.softDelete)
