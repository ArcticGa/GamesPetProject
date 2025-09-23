import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IReview } from '../../../types/types'

interface IReviewsSliceState {
	reviews: IReview[]
	status: 'loading' | 'success' | 'error'
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export const fetchReviews = createAsyncThunk<IReview[], number | string>(
	'reviews/fetchReviews',
	async id => {
		const { data } = await axios.get(
			`https://68c693c7442c663bd027641b.mockapi.io/reviews?game_id=${id}`
		)
		return data
	}
)

const initialState: IReviewsSliceState = {
	reviews: [],
	status: Status.LOADING,
}

export const gameReviewsSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		setReviews(state, action: PayloadAction<IReview[]>) {
			state.reviews = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchReviews.pending, state => {
				state.status = Status.LOADING
				state.reviews = []
			})
			.addCase(fetchReviews.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.reviews = action.payload
			})
			.addCase(fetchReviews.rejected, state => {
				state.status = Status.ERROR
				state.reviews = []
			})
	},
})

export const { setReviews } = gameReviewsSlice.actions
export default gameReviewsSlice.reducer
