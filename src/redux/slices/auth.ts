import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { LoginInputs } from '../../components/AuthPage/Forms/LoginForm'
import { RegisterInputs } from '../../components/AuthPage/Forms/RegisterForm'
import { IUser } from '../../types/types'

interface IAuthSlice {
	userData: IUser | null
	status: 'loading' | 'success' | 'error'
	error: string | null
}

type updatedFieldsType = {
	likedReviewId?: string
	dislikedReviewId?: string
	delLikedReviewId?: string
	delDislikedReviewId?: string
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export const fetchAuth = createAsyncThunk<IUser, LoginInputs>(
	'auth/fetchAuth',
	async params => {
		const { data } = await axios.post(
			'http://localhost:5000/auth/login',
			params
		)
		return data
	}
)

export const fetchRegister = createAsyncThunk<IUser, RegisterInputs>(
	'auth/register',
	async params => {
		const { data } = await axios.post(
			'http://localhost:5000/auth/register',
			params
		)
		return data
	}
)

export const fetchAuthMe = createAsyncThunk<IUser>('auth/me', async () => {
	const { data } = await axios.get('http://localhost:5000/auth/me', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	})
	return data
})

export const fetchUpdateUser = createAsyncThunk<IUser, updatedFieldsType>(
	'user/update',
	async (updatedFields, { rejectWithValue }) => {
		try {
			const { data } = await axios.patch(
				'http://localhost:5000/user/update',
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

const initialState: IAuthSlice = {
	userData: null,
	status: Status.LOADING,
	error: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserData(state, action) {
			state.userData = action.payload
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
			.addCase(fetchAuth.rejected, state => {
				state.userData = null
				state.status = Status.ERROR
			})
			.addCase(fetchRegister.pending, state => {
				state.userData = null
				state.status = Status.LOADING
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				state.userData = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchRegister.rejected, state => {
				state.userData = null
				state.status = Status.ERROR
			})
			.addCase(fetchAuthMe.pending, state => {
				state.userData = null
				state.status = Status.LOADING
			})
			.addCase(fetchAuthMe.fulfilled, (state, action) => {
				state.userData = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchAuthMe.rejected, state => {
				state.userData = null
				state.status = Status.ERROR
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
				state.error = action.payload as string
			})
	},
})

export const { setUserData, logout } = authSlice.actions
export default authSlice.reducer
