import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { ApiError, IGameYear, Status } from '../../../types/types'

interface IGamesYearSliceState {
	gamesYear: IGameYear[]
	status: 'loading' | 'success' | 'error'
	error: string
}

export const fetchGamesYear = createAsyncThunk<
	IGameYear[],
	number,
	{ rejectValue: ApiError }
>('games/fetchGamesYearStatus', async (year, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(
			`https://68d4fe69e29051d1c0acd263.mockapi.io/games-finalists?year=${year}`
		)
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

const initialState: IGamesYearSliceState = {
	gamesYear: [],
	status: Status.LOADING,
	error: '',
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
			.addCase(fetchGamesYear.rejected, (state, action) => {
				state.status = Status.ERROR
				state.gamesYear = []
				state.error = action.payload?.message ?? 'Неизвестная ошибка'
			})
	},
})

export const { setGamesYear } = gameYearSlice.actions
export default gameYearSlice.reducer
