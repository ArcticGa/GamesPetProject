import { createSlice } from '@reduxjs/toolkit'

// interface IValueSearchSlice {
// 	filteredArray: unknown
// }

const initialState = {
	filteredArray: [],
}

export const filteredSearchArraySlice = createSlice({
	name: 'filteredArray',
	initialState,
	reducers: {
		setFilteredArray(state, action) {
			state.filteredArray = action.payload
		},
	},
})

export const { setFilteredArray } = filteredSearchArraySlice.actions
export default filteredSearchArraySlice.reducer
