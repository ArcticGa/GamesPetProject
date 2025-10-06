import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IReview } from '../../../types/types'

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

interface IReviewsSliceState {
	reviews: IReview[]
	status: 'loading' | 'success' | 'error'
	error: string | null
}

type paramsType = {
	reviewId: string
	updatedFields: updatedFieldsType
}

type updatedFieldsType = {
	isLikePlus?: string
	isDislikePlus?: string
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
			`${BASE_BACKEND_URL}/reviewsByGameId/${id}`
		)
		return data
	}
)

export const fetchOwnReviews = createAsyncThunk<IReview[], string>(
	'reviews/fetchOwnReviews',
	async userId => {
		const { data } = await axios.get(
			`${BASE_BACKEND_URL}/reviewsByUserId/${userId}`
		)

		return data
	}
)

export const fetchUpdateReview = createAsyncThunk<IReview, paramsType>(
	'review/update',
	async ({ reviewId, updatedFields }, { rejectWithValue }) => {
		try {
			const { data } = await axios.patch(
				`${BASE_BACKEND_URL}/review/update/${reviewId}`,
				updatedFields,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			return data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

const initialState: IReviewsSliceState = {
	reviews: [],
	status: Status.LOADING,
	error: null,
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
			.addCase(fetchUpdateReview.pending, state => {
				state.status = Status.LOADING
			})
			.addCase(fetchUpdateReview.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				const index = state.reviews.findIndex(
					item => item._id === action.payload._id
				)
				if (index !== -1) {
					state.reviews[index] = { ...state.reviews[index], ...action.payload }
				}
			})
			.addCase(fetchUpdateReview.rejected, (state, action) => {
				state.status = Status.ERROR
				state.error = action.payload as string
			})
	},
})

export const { setReviews } = gameReviewsSlice.actions
export default gameReviewsSlice.reducer
