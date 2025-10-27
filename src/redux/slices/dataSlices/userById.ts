import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { ApiError, IUser, Status } from '../../../types/types'

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

interface IUserSliceState {
	user: IUser | null
	status: 'loading' | 'success' | 'error'
	error: string
}

export const fetchUserById = createAsyncThunk<
	IUser,
	string,
	{ rejectValue: ApiError }
>('game/fetchUserById', async (userId, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(`${BASE_BACKEND_URL}/user/${userId}`)
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

const initialState: IUserSliceState = {
	user: null,
	status: Status.LOADING,
	error: '',
}

export const getUserByIdSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUserById.pending, state => {
				state.status = Status.LOADING
				state.user = null
			})
			.addCase(fetchUserById.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.user = action.payload
			})
			.addCase(fetchUserById.rejected, (state, action) => {
				state.status = Status.ERROR
				state.user = null
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
	},
})

export const { setUser } = getUserByIdSlice.actions
export default getUserByIdSlice.reducer
