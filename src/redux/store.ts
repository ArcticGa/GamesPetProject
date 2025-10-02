import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import authSlice from './slices/auth'
import gameByIdSlice from './slices/dataSlices/gameByIdSlice'
import gameReviewsSlice from './slices/dataSlices/gameReviewsSlice'
import gamesByCategorySlice from './slices/dataSlices/gamesByCategory'
import gamesSlice from './slices/dataSlices/gamesSlice'
import gameYearSlice from './slices/dataSlices/gameYearsSlice'
import dropDownSidebarSlice from './slices/sidebarSlices/dropDownSidebarSlice'
import hideSidebarSlice from './slices/sidebarSlices/hideSidebarSlice'
import linksSlice from './slices/sidebarSlices/linksSlice'
import statusSearchBlockSlice from './slices/sidebarSlices/statusSearchBlockSlice'

export const store = configureStore({
	reducer: {
		linksSlice,
		hideSidebarSlice,
		statusSearchBlockSlice,
		dropDownSidebarSlice,
		gamesSlice,
		gameByIdSlice,
		gamesByCategorySlice,
		gameReviewsSlice,
		gameYearSlice,
		authSlice,
	},
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
