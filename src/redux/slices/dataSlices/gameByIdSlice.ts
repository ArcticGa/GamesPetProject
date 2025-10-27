import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { IFullGame, Status } from '../../../types/types'

interface IGameSliceState {
	game: IFullGame | null
	status: 'loading' | 'success' | 'error'
	error: string | null
}

export const fetchGameById = createAsyncThunk<IFullGame, string | number>(
	'game/fetchGameByIdStatus',
	async (id, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`/api/games/getOne`, {
				params: { id },
			})
			return data
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

const initialState: IGameSliceState = {
	game: null,
	status: Status.LOADING,
	error: null,
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
				state.error = action.payload as string
			})
	},
})

export const { setGame } = gameByIdSlice.actions
export default gameByIdSlice.reducer
