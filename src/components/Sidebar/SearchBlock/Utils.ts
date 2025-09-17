import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { setFilteredArray } from '../../../redux/slices/sidebarSlices/filteredSearchArraySlice'
import {
	setCloseSearchBlock,
	setOpenSearchBlock,
} from '../../../redux/slices/sidebarSlices/statusSearchBlockSlice'
import { arraySearchGames } from '../../../utils/MiniArrays'

const filterGamesFunc = (searchValue: string) => {
	if (!searchValue) {
		return []
	}

	return arraySearchGames.filter(game => {
		return game.nameGame.toLowerCase().includes(searchValue.toLowerCase())
	})
}

export const isSearchEmpty = (
	searchValue: string,
	dispatch: Dispatch<UnknownAction>
) => {
	if (searchValue.length === 0) {
		dispatch(setCloseSearchBlock())
		dispatch(setFilteredArray([]))
	}
}

export const debounceFunc = (
	searchValue: string,
	dispatch: Dispatch<UnknownAction>
) => {
	if (searchValue.length !== 0) {
		dispatch(setOpenSearchBlock())
	}

	const newArray = filterGamesFunc(searchValue)
	dispatch(setFilteredArray(newArray))
}
