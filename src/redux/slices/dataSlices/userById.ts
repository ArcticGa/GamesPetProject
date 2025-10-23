import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IUser, Status } from '../../../types/types'

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

interface IUserSliceState {
	user: IUser | null
	status: 'loading' | 'success' | 'error'
	error: string | null
}

export const fetchUserById = createAsyncThunk<IUser, string>(
	'game/fetchUserById',
	async (userId, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${BASE_BACKEND_URL}/user/${userId}`)
			return data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

const initialState: IUserSliceState = {
	user: null,
	status: Status.LOADING,
	error: null,
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
				state.error = action.payload as string
			})
	},
})

export const { setUser } = getUserByIdSlice.actions
export default getUserByIdSlice.reducer
