import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IUser } from '../../../types/types'

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

interface IUserSliceState {
	user: IUser | null
	status: 'loading' | 'success' | 'error'
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export const fetchUserById = createAsyncThunk<IUser, string>(
	'game/fetchUserById',
	async userId => {
		const { data } = await axios.get(`${BASE_BACKEND_URL}/user/${userId}`)
		return data
	}
)

const initialState: IUserSliceState = {
	user: null,
	status: Status.LOADING,
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
			.addCase(fetchUserById.rejected, state => {
				state.status = Status.ERROR
				state.user = null
			})
	},
})

export const { setUser } = getUserByIdSlice.actions
export default getUserByIdSlice.reducer
