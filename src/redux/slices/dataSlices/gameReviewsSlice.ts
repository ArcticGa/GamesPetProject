import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { ApiError, IReview, Status } from '../../../types/types'

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

interface IReviewsSliceState {
	reviews: IReview[]
	status: 'loading' | 'success' | 'error'
	error: string
}

type paramsType = {
	reviewId: string
	updatedFields: updatedFieldsType
}

type updatedFieldsType = {
	isLikePlus?: number
	isDislikePlus?: number
	grade?: number
	isRecommended?: boolean
	text?: string
}

type createReviewParams = {
	gameId: number
	text: string
	grade: number
	isRecommended: boolean
}

export const fetchGameReviews = createAsyncThunk<
	IReview[],
	number | string,
	{ rejectValue: ApiError }
>('reviews/fetchGameReviews', async (id, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(
			`${BASE_BACKEND_URL}/reviewsByGameId/${id}`
		)
		return data
	} catch (err) {
		const error = err as AxiosError<ApiError>
		if (error.response?.data) {
			return rejectWithValue(error.response.data)
		}
		//Если нет ответа от сервака
		return rejectWithValue({ message: 'Network error' })
	}
})

export const fetchOwnReviews = createAsyncThunk<
	IReview[],
	string,
	{ rejectValue: ApiError }
>('reviews/fetchOwnReviews', async (userId, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(
			`${BASE_BACKEND_URL}/reviewsByUserId/${userId}`
		)

		return data
	} catch (err) {
		const error = err as AxiosError<ApiError>
		if (error.response?.data) {
			return rejectWithValue(error.response.data)
		}
		//Если нет ответа от сервака
		return rejectWithValue({ message: 'Network error' })
	}
})

export const fetchUpdateReview = createAsyncThunk<
	IReview,
	paramsType,
	{ rejectValue: ApiError }
>('review/update', async ({ reviewId, updatedFields }, { rejectWithValue }) => {
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
	} catch (err) {
		const error = err as AxiosError<ApiError>
		if (error.response?.data) {
			return rejectWithValue(error.response.data)
		}
		//Если нет ответа от сервака
		return rejectWithValue({ message: 'Network error' })
	}
})

export const fetchCreateReview = createAsyncThunk<
	IReview,
	createReviewParams,
	{ rejectValue: ApiError }
>('review/create', async (fields, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(`${BASE_BACKEND_URL}/review`, fields, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})

		return data
	} catch (err) {
		const error = err as AxiosError<ApiError>
		if (error.response?.data) {
			return rejectWithValue(error.response.data)
		}
		//Если нет ответа от сервака
		return rejectWithValue({ message: 'Network error' })
	}
})

export const fetchDeleteReview = createAsyncThunk<
	IReview,
	string,
	{ rejectValue: ApiError }
>('review/delete', async (reviewId, { rejectWithValue }) => {
	try {
		const { data } = await axios.delete(
			`${BASE_BACKEND_URL}/review/${reviewId}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		)

		return data
	} catch (err) {
		const error = err as AxiosError<ApiError>
		if (error.response?.data) {
			return rejectWithValue(error.response.data)
		}
		//Если нет ответа от сервака
		return rejectWithValue({ message: 'Network error' })
	}
})

const initialState: IReviewsSliceState = {
	reviews: [],
	status: Status.LOADING,
	error: '',
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
			.addCase(fetchGameReviews.rejected, (state, action) => {
				state.status = Status.ERROR
				state.reviews = []
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
			.addCase(fetchOwnReviews.pending, state => {
				state.status = Status.LOADING
				state.reviews = []
			})
			.addCase(fetchOwnReviews.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.reviews = action.payload
			})
			.addCase(fetchOwnReviews.rejected, (state, action) => {
				state.status = Status.ERROR
				state.reviews = []
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
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
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
			.addCase(fetchCreateReview.pending, state => {
				state.status = Status.LOADING
			})
			.addCase(fetchCreateReview.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.reviews.push(action.payload)
			})
			.addCase(fetchCreateReview.rejected, (state, action) => {
				state.status = Status.ERROR
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
			.addCase(fetchDeleteReview.pending, state => {
				state.status = Status.LOADING
			})
			.addCase(fetchDeleteReview.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.reviews = state.reviews.filter(
					review => review._id !== action.payload._id
				)
			})
			.addCase(fetchDeleteReview.rejected, (state, action) => {
				state.status = Status.ERROR
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
	},
})

export const { setReviews } = gameReviewsSlice.actions
export default gameReviewsSlice.reducer
