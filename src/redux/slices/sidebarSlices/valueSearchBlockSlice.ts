import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IValueSearchSlice {
	searchValue: string
}

const initialState: IValueSearchSlice = {
	searchValue: '',
}

export const valueSearchBlock = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
	},
})

export const { setSearchValue } = valueSearchBlock.actions
export default valueSearchBlock.reducer
