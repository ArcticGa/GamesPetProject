import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { ApiError, IFullGame, Status } from '../../../types/types'

interface IGameSliceState {
	game: IFullGame | null
	status: 'loading' | 'success' | 'error'
	error: string
}

export const fetchGameById = createAsyncThunk<
	IFullGame,
	string | number,
	{ rejectValue: ApiError }
>('game/fetchGameByIdStatus', async (id, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(`/api/games/getOne`, {
			params: { id },
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

const initialState: IGameSliceState = {
	game: null,
	status: Status.LOADING,
	error: '',
}

export const gameByIdSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setGame(state, action: PayloadAction<IFullGame>) {
			state.game = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchGameById.pending, state => {
				state.status = Status.LOADING
				state.game = null
			})
			.addCase(fetchGameById.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.game = action.payload
			})
			.addCase(fetchGameById.rejected, (state, action) => {
				state.status = Status.ERROR
				state.game = null
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
	},
})

export const { setGame } = gameByIdSlice.actions
export default gameByIdSlice.reducer
