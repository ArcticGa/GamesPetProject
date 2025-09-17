import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import dropDownSidebarSlice from './slices/sidebarSlices/dropDownSidebarSlice'
import filteredSearchArraySlice from './slices/sidebarSlices/filteredSearchArraySlice'
import hideSidebarSlice from './slices/sidebarSlices/hideSidebarSlice'
import linksSlice from './slices/sidebarSlices/linksSlice'
import loginAccountSlice from './slices/sidebarSlices/loginAccountSlice'
import statusSearchBlockSlice from './slices/sidebarSlices/statusSearchBlockSlice'
import valueSearchBlockSlice from './slices/sidebarSlices/valueSearchBlockSlice'

export const store = configureStore({
	reducer: {
		linksSlice,
		hideSidebarSlice,
		statusSearchBlockSlice,
		loginAccountSlice,
		valueSearchBlockSlice,
		filteredSearchArraySlice,
		dropDownSidebarSlice,
	},
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
