import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IGame, Status } from '../../../types/types'

const BASE_URL = import.meta.env.VITE_GAMES_BASE_API_URL
const RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY

interface ISortGamesState {
	sortedGames: IGame[]
	status: 'loading' | 'success' | 'error'
	error: string | null
}

export const fetchSortedGames = createAsyncThunk<IGame[], string>(
	'games/sorted',
	async (sortBy, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${BASE_URL}/games`, {
				params: {
					platform: 'pc',
					'sort-by': sortBy,
				},
				headers: {
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

export const fetchFilteredGames = createAsyncThunk<IGame[], string>(
	'games/filtered',
	async (tags, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${BASE_URL}/filter`, {
				params: {
					tag: tags,
					platform: 'pc',
				},
				headers: {
					'x-rapidapi-key': `${RAPIDAPI_KEY}`,
					'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
				},
			})

			return data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

const initialState: ISortGamesState = {
	sortedGames: [],
	status: Status.LOADING,
	error: null,
}

export const sortGamesSlice = createSlice({
	name: 'sortedGames',
	initialState,
	reducers: {
		setSortedGames(state, action: PayloadAction<IGame[]>) {
			state.sortedGames = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchSortedGames.pending, state => {
				state.status = Status.LOADING
				state.sortedGames = []
			})
			.addCase(fetchSortedGames.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.sortedGames = action.payload
			})
			.addCase(fetchSortedGames.rejected, (state, action) => {
				state.status = Status.ERROR
				state.sortedGames = []
				state.error = action.payload as string
			})
			.addCase(fetchFilteredGames.pending, state => {
				state.status = Status.LOADING
				state.sortedGames = []
			})
			.addCase(fetchFilteredGames.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.sortedGames = action.payload
			})
			.addCase(fetchFilteredGames.rejected, (state, action) => {
				state.status = Status.ERROR
				state.sortedGames = []
				state.error = action.payload as string
			})
	},
})

export const { setSortedGames } = sortGamesSlice.actions
export default sortGamesSlice.reducer
