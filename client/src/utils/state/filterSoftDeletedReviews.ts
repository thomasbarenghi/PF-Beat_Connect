export const filterSoftDeletedReviews = (beats: any[]) =>
  beats
    .map((beat: any) => {
      const filteredReviews = beat.review.filter((review: any) => !review.softDelete)
      return { ...beat, review: filteredReviews }
    })
    .filter((beat: any) => !beat.softDelete)
