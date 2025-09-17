import { createSlice } from '@reduxjs/toolkit'

interface ISearchBlockSlice {
	activeSearch: boolean
}

const initialState: ISearchBlockSlice = {
	activeSearch: false,
}

export const statusSearchBlockSlice = createSlice({
	name: 'searchBlock',
	initialState,
	reducers: {
		setCloseSearchBlock(state) {
			state.activeSearch = false
		},
		setOpenSearchBlock(state) {
			state.activeSearch = true
		},
	},
})

export const { setCloseSearchBlock, setOpenSearchBlock } =
	statusSearchBlockSlice.actions
export default statusSearchBlockSlice.reducer
