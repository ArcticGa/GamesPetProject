import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IFullGame } from '../../../types/types'
const BASE_URL = import.meta.env.VITE_GAMES_BASE_API_URL
const RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY

interface IGameSliceState {
	game: IFullGame | null
	status: 'loading' | 'success' | 'error'
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export const fetchGameById = createAsyncThunk<IFullGame, string>(
	'game/fetchGameByIdStatus',
	async id => {
		const response = await axios.get(`${BASE_URL}/game`, {
			params: {
				id,
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
	game: null,
	status: Status.LOADING,
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
			.addCase(fetchGameById.rejected, state => {
				state.status = Status.ERROR
				state.game = null
			})
	},
})

export const { setGame } = gameByIdSlice.actions
export default gameByIdSlice.reducer
