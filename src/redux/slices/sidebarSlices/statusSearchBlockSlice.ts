import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
		setSearchBlock(state, action: PayloadAction<boolean>) {
			state.activeSearch = action.payload
		},
	},
})

export const { setSearchBlock } = statusSearchBlockSlice.actions
export default statusSearchBlockSlice.reducer
