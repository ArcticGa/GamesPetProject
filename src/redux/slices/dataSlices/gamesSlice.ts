import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IGame, Status } from '../../../types/types'
const BASE_URL = import.meta.env.VITE_GAMES_BASE_API_URL
const RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY

interface IGameSliceState {
	games: IGame[]
	status: 'loading' | 'success' | 'error'
	error: string | null
}

export const fetchGames = createAsyncThunk<IGame[]>(
	'games/fetchGamesStatus',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${BASE_URL}/games`, {
				params: {
					platform: 'pc',
				},
				headers: {
					'Content-Type': 'application/json',
					'x-rapidapi-key': `${RAPIDAPI_KEY}`,
					'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
				},
			})
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

const initialState: IGameSliceState = {
	games: [],
	status: Status.LOADING,
	error: null,
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
				state.error = action.payload as string
			})
	},
})

export const { setGames } = gamesSlice.actions
export default gamesSlice.reducer
