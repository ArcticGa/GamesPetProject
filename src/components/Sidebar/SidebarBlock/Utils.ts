import { Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { setSidebarStatus } from '../../../redux/slices/sidebarSlices/hideSidebarSlice'
import { setCloseSearchBlock } from '../../../redux/slices/sidebarSlices/statusSearchBlockSlice'
import { setSearchValue } from '../../../redux/slices/sidebarSlices/valueSearchBlockSlice'

export const closeSidebarHandler = (
	dispatch: Dispatch<UnknownAction>,
	activeSearch: boolean
) => {
	dispatch(setSidebarStatus())
	dispatch(setSearchValue(''))

	if (activeSearch) {
		dispatch(setCloseSearchBlock())
	}
}

export const stylesAside = (sidebarStatus: boolean) => {
	const basedStyles = 'm-6 bg-main-blocks rounded-2xl fixed z-10'
	if (sidebarStatus) return `${basedStyles} w-2xs py-6 px-4 `
	return `${basedStyles} w-18 py-4 px-3 `
}
