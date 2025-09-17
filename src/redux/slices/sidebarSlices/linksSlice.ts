import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ILinksSlice {
	activeLink: number
}

const initialState: ILinksSlice = {
	activeLink: 0,
}

export const linksSlice = createSlice({
	name: 'links',
	initialState,
	reducers: {
		setActiveLink(state, action: PayloadAction<number>) {
			state.activeLink = action.payload
		},
	},
})

export const { setActiveLink } = linksSlice.actions
export default linksSlice.reducer
