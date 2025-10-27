import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import {
	ApiError,
	IUser,
	LoginInputs,
	RegisterInputs,
	Status,
} from '../../types/types'

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

interface IAuthSlice {
	userData: IUser | null
	status: 'loading' | 'success' | 'error'
	error: string
}

type updatedFieldsType = {
	likedReviewId?: string
	dislikedReviewId?: string
	delLikedReviewId?: string
	delDislikedReviewId?: string
	avatarUrl?: string
	nickname?: string
	ownReviewId?: string
	delOwnReviewId?: string
	ownReviewsUpdate?: number
	addGameId?: number
	removeGameId?: number
}

export const fetchAuth = createAsyncThunk<
	IUser,
	LoginInputs,
	{ rejectValue: ApiError }
>('auth/fetchAuth', async (params, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(`${BASE_BACKEND_URL}/auth/login`, params)
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

export const fetchRegister = createAsyncThunk<
	IUser,
	RegisterInputs,
	{ rejectValue: ApiError }
>('auth/register', async (params, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(
			`${BASE_BACKEND_URL}/auth/register`,
			params
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

export const fetchAuthMe = createAsyncThunk<
	IUser,
	void,
	{ rejectValue: ApiError }
>('auth/me', async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(`${BASE_BACKEND_URL}/auth/me`, {
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

export const fetchUpdateUser = createAsyncThunk<
	IUser,
	updatedFieldsType,
	{ rejectValue: ApiError }
>('user/update', async (updatedFields, { rejectWithValue }) => {
	try {
		const { data } = await axios.patch(
			`${BASE_BACKEND_URL}/user/update`,
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

const initialState: IAuthSlice = {
	userData: null,
	status: Status.LOADING,
	error: '',
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserData(state, action: PayloadAction<IUser>) {
			state.userData = action.payload
		},
		setAuthStatus(state, action: PayloadAction<Status>) {
			state.status = action.payload
		},
		logout(state) {
			state.userData = null
		},
	},

	extraReducers: builder => {
		builder
			.addCase(fetchAuth.pending, state => {
				state.userData = null
				state.status = Status.LOADING
			})
			.addCase(fetchAuth.fulfilled, (state, action) => {
				state.userData = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchAuth.rejected, (state, action) => {
				state.userData = null
				state.status = Status.ERROR
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
			.addCase(fetchRegister.pending, state => {
				state.userData = null
				state.status = Status.LOADING
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				state.userData = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchRegister.rejected, (state, action) => {
				state.userData = null
				state.status = Status.ERROR
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
			.addCase(fetchAuthMe.pending, state => {
				state.userData = null
				state.status = Status.LOADING
			})
			.addCase(fetchAuthMe.fulfilled, (state, action) => {
				state.userData = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchAuthMe.rejected, (state, action) => {
				state.userData = null
				state.status = Status.ERROR
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
			.addCase(fetchUpdateUser.pending, state => {
				state.status = Status.LOADING
			})
			.addCase(fetchUpdateUser.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.userData = action.payload
			})
			.addCase(fetchUpdateUser.rejected, (state, action) => {
				state.status = Status.ERROR
				state.userData = null
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
	},
})

export const { setUserData, setAuthStatus, logout } = authSlice.actions
export default authSlice.reducer
