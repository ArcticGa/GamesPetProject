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

export const fetchGameReviews = createAsyncThunk<IReview[], number | string>(
	'reviews/fetchGameReviews',
	async id => {
		const { data } = await axios.get(
			`http://localhost:5000/reviewsByGameId/${id}`
		)
		return data
	}
)

export const fetchOwnReviews = createAsyncThunk<IReview[], string>(
	'reviews/fetchOwnReviews',
	async userId => {
		const { data } = await axios.get(
			`http://localhost:5000/reviewsByUserId/${userId}`
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
			.addCase(fetchGameReviews.pending, state => {
				state.status = Status.LOADING
				state.reviews = []
			})
			.addCase(fetchGameReviews.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.reviews = action.payload
			})
			.addCase(fetchGameReviews.rejected, state => {
				state.status = Status.ERROR
				state.reviews = []
			})
			.addCase(fetchOwnReviews.pending, state => {
				state.status = Status.LOADING
				state.reviews = []
			})
			.addCase(fetchOwnReviews.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.reviews = action.payload
			})
			.addCase(fetchOwnReviews.rejected, state => {
				state.status = Status.ERROR
				state.reviews = []
			})
	},
})

export const { setReviews } = gameReviewsSlice.actions
export default gameReviewsSlice.reducer
