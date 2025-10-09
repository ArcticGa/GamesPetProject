import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IReview } from '../../types/types'

interface ILikedReviewsSlice {
	likedReviews: IReview[]
}

const initialState: ILikedReviewsSlice = {
	likedReviews: [],
}

export const likedReviewsSlice = createSlice({
	name: 'likedReviews',
	initialState,
	reducers: {
		setLikedReviews(state, action: PayloadAction<IReview[]>) {
			state.likedReviews = action.payload
		},
	},
})

export const { setLikedReviews } = likedReviewsSlice.actions
export default likedReviewsSlice.reducer
