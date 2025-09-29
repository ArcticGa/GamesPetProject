import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ILinksSlice {
	activeLink: string
}

const initialState: ILinksSlice = {
	activeLink: window.location.pathname,
}

export const linksSlice = createSlice({
	name: 'links',
	initialState,
	reducers: {
		setActiveLink(state, action: PayloadAction<string>) {
			state.activeLink = action.payload
		},
	},
})

export const { setActiveLink } = linksSlice.actions
export default linksSlice.reducer
