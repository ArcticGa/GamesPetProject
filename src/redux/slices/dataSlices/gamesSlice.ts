import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IGame } from '../../../types/types'
const BASE_URL = import.meta.env.VITE_GAMES_BASE_API_URL
const RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY

interface IGameSliceState {
	games: IGame[]
	status: 'loading' | 'success' | 'error'
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export const fetchGames = createAsyncThunk(
	'games/fetchGamesStatus',
	async () => {
		const response = await axios.get(`${BASE_URL}`, {
			params: {
				platform: 'pc',
			},
			headers: {
				'x-rapidapi-key': `${RAPIDAPI_KEY}`,
				'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
			},
		})
		return response.data
	}
)

const initialState: IGameSliceState = {
	games: [],
	status: Status.LOADING,
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
			.addCase(fetchGames.rejected, state => {
				state.status = Status.ERROR
				state.games = []
			})
	},
})

export const { setGames } = gamesSlice.actions
export default gamesSlice.reducer
