import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IGameYear } from '../../../types/types'

interface IGamesYearSliceState {
	gamesYear: IGameYear[]
	status: 'loading' | 'success' | 'error'
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export const fetchGamesYear = createAsyncThunk<IGameYear[], number>(
	'games/fetchGamesYearStatus',
	async year => {
		const { data } = await axios.get(
			`https://68d4fe69e29051d1c0acd263.mockapi.io/games-finalists?year=${year}`
		)
		return data
	}
)

const initialState: IGamesYearSliceState = {
	gamesYear: [],
	status: Status.LOADING,
}

export const gameYearSlice = createSlice({
	name: 'gamesYear',
	initialState,
	reducers: {
		setGamesYear(state, action: PayloadAction<IGameYear[]>) {
			state.gamesYear = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchGamesYear.pending, state => {
				state.status = Status.LOADING
				state.gamesYear = []
			})
			.addCase(fetchGamesYear.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.gamesYear = action.payload
			})
			.addCase(fetchGamesYear.rejected, state => {
				state.status = Status.ERROR
				state.gamesYear = []
			})
	},
})

export const { setGamesYear } = gameYearSlice.actions
export default gameYearSlice.reducer
