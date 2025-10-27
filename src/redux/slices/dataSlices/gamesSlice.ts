import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { ApiError, IGame, Status } from '../../../types/types'

interface IGameSliceState {
	games: IGame[]
	status: 'loading' | 'success' | 'error'
	error: string
}

export const fetchGames = createAsyncThunk<
	IGame[],
	void,
	{ rejectValue: ApiError }
>('games/fetchGamesStatus', async (_, { rejectWithValue }) => {
	try {
		const query = new URLSearchParams()
		query.append('platform', 'pc')

		const response = await axios.get(`/api/games?${query.toString()}`)
		return response.data
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
	games: [],
	status: Status.LOADING,
	error: '',
}

export const gamesSlice = createSlice({
	name: 'games',
	initialState,
	reducers: {
		setGames(state, action: PayloadAction<IGame[]>) {
			state.games = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchGames.pending, state => {
				state.status = Status.LOADING
				state.games = []
			})
			.addCase(fetchGames.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.games = action.payload
			})
			.addCase(fetchGames.rejected, (state, action) => {
				state.status = Status.ERROR
				state.games = []
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
	},
})

export const { setGames } = gamesSlice.actions
export default gamesSlice.reducer
