import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IDropDownSlice {
	openedCategory: boolean
	openedGenres: boolean
}

const initialState: IDropDownSlice = {
	openedCategory: false,
	openedGenres: false,
}

export const dropDownSidebarSlice = createSlice({
	name: 'dropDowns',
	initialState,
	reducers: {
		setCategoriesDropDown(state, action: PayloadAction<boolean>) {
			state.openedCategory = action.payload
		},
		setGenresDropDown(state, action: PayloadAction<boolean>) {
			state.openedGenres = action.payload
		},
	},
})

export const { setCategoriesDropDown, setGenresDropDown } =
	dropDownSidebarSlice.actions
export default dropDownSidebarSlice.reducer
