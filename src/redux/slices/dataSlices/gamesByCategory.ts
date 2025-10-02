import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IGame } from '../../../types/types'
const BASE_URL = import.meta.env.VITE_GAMES_BASE_API_URL
const RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY

interface IGamesByCategorySliceState {
	gamesByCategory: IGame[]
	status: 'loading' | 'success' | 'error'
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export const fetchGamesByCategory = createAsyncThunk<IGame[], string>(
	'game/fetchGamesByCategoriesStatus',
	async category => {
		const response = await axios.get(`${BASE_URL}/games`, {
			params: {
				category,
			},
			headers: {
				'Content-Type': 'application/json',
				'x-rapidapi-key': `${RAPIDAPI_KEY}`,
				'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
			},
		})
		return response.data
	}
)

const initialState: IGamesByCategorySliceState = {
	gamesByCategory: [],
	status: Status.LOADING,
}

export const gamesByCategorySlice = createSlice({
	name: 'gamesByCategory',
	initialState,
	reducers: {
		setGames(state, action: PayloadAction<IGame[]>) {
			state.gamesByCategory = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchGamesByCategory.pending, state => {
				state.status = Status.LOADING
				state.gamesByCategory = []
			})
			.addCase(fetchGamesByCategory.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.gamesByCategory = action.payload
			})
			.addCase(fetchGamesByCategory.rejected, state => {
				state.status = Status.ERROR
				state.gamesByCategory = []
			})
	},
})

export const { setGames } = gamesByCategorySlice.actions
export default gamesByCategorySlice.reducer
