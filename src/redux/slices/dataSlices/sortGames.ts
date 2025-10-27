import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IGame, Status } from '../../../types/types'

type fetchSortedGamesProps = {
	category?: string
	sortBy?: string
}

interface ISortGamesState {
	sortedGames: IGame[]
	status: 'loading' | 'success' | 'error'
	error: string | null
}

export const fetchSortedGames = createAsyncThunk<
	IGame[],
	fetchSortedGamesProps
>('games/sorted', async ({ category, sortBy }, { rejectWithValue }) => {
	try {
		const response = await axios.get(`/api/games`, {
			params: {
				platform: 'pc',
				category: category,
				sortBy,
			},
		})
		return response.data
	} catch (error: any) {
		return rejectWithValue(error.response.data)
	}
})

export const fetchFilteredGames = createAsyncThunk<IGame[], string>(
	'games/filtered',
	async (tags, { rejectWithValue }) => {
		try {
			const query = new URLSearchParams()
			query.append('platform', 'pc')
			if (tags) query.append('tags', tags)

			const { data } = await axios.get(`/api/games/filter?${query.toString()}`)

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
