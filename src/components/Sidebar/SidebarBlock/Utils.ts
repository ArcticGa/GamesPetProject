import { setSidebarStatus } from '../../../redux/slices/sidebarSlices/hideSidebarSlice'
import { setSearchBlock } from '../../../redux/slices/sidebarSlices/statusSearchBlockSlice'

export const closeSidebarHandler = (dispatch: any, activeSearch: boolean) => {
	dispatch(setSidebarStatus())

	if (activeSearch) {
		dispatch(setSearchBlock(false))
	}
}

export const stylesAside = (sidebarStatus: boolean) => {
	const basedStyles = 'm-6 bg-main-blocks rounded-2xl fixed z-10'
	if (sidebarStatus) return `${basedStyles} w-2xs py-6 px-4 `
	return `${basedStyles} w-18 py-4 px-3 `
}
