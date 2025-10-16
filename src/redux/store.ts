import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import authSlice from './slices/auth'
import gameByIdSlice from './slices/dataSlices/gameByIdSlice'
import gameReviewsSlice from './slices/dataSlices/gameReviewsSlice'
import gamesSlice from './slices/dataSlices/gamesSlice'
import gameYearSlice from './slices/dataSlices/gameYearsSlice'
import sortGamesSlice from './slices/dataSlices/sortGames'
import getUserByIdSlice from './slices/dataSlices/userById'
import featuredGamesSlice from './slices/featuredGamesSlice'
import likedReviewsSlice from './slices/likedReviewsSlice'
import linksSlice from './slices/sidebarSlices/linksSlice'
import statusSearchBlockSlice from './slices/sidebarSlices/statusSearchBlockSlice'

export const store = configureStore({
	reducer: {
		linksSlice,
		statusSearchBlockSlice,
		gamesSlice,
		gameByIdSlice,
		sortGamesSlice,
		gameReviewsSlice,
		gameYearSlice,
		authSlice,
		getUserByIdSlice,
		featuredGamesSlice,
		likedReviewsSlice,
	},
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
