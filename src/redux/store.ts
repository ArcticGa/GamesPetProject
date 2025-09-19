import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import gameByIdSlice from './slices/dataSlices/gameByIdSlice'
import gamesSlice from './slices/dataSlices/gamesSlice'
import dropDownSidebarSlice from './slices/sidebarSlices/dropDownSidebarSlice'
import hideSidebarSlice from './slices/sidebarSlices/hideSidebarSlice'
import linksSlice from './slices/sidebarSlices/linksSlice'
import loginAccountSlice from './slices/sidebarSlices/loginAccountSlice'
import statusSearchBlockSlice from './slices/sidebarSlices/statusSearchBlockSlice'

export const store = configureStore({
	reducer: {
		linksSlice,
		hideSidebarSlice,
		statusSearchBlockSlice,
		loginAccountSlice,
		dropDownSidebarSlice,
		gamesSlice,
		gameByIdSlice,
	},
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
