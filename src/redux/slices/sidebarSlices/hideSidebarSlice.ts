import { createSlice } from '@reduxjs/toolkit'

interface IHideSidebarSliceSlice {
	sidebarStatus: boolean
}

const initialState: IHideSidebarSliceSlice = {
	sidebarStatus: true,
}

export const hideSidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		setSidebarStatus(state) {
			state.sidebarStatus = !state.sidebarStatus
		},
	},
})

export const { setSidebarStatus } = hideSidebarSlice.actions
export default hideSidebarSlice.reducer
