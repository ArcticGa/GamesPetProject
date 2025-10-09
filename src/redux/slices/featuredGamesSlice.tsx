import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFullGame } from '../../types/types'

interface IFeaturedGamesSlice {
	featuredGames: IFullGame[]
}

const initialState: IFeaturedGamesSlice = {
	featuredGames: [],
}

export const featuredGamesSlice = createSlice({
	name: 'featuredGames',
	initialState,
	reducers: {
		setFeaturedGames(state, action: PayloadAction<IFullGame[]>) {
			state.featuredGames = action.payload
		},
	},
})

export const { setFeaturedGames } = featuredGamesSlice.actions
export default featuredGamesSlice.reducer
