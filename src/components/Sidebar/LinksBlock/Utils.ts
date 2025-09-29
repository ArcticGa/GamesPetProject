import { Dispatch } from '@reduxjs/toolkit'
import { setActiveLink } from '../../../redux/slices/sidebarSlices/linksSlice'

export const changePage = (
	path: string,
	activeLink: string,
	dispatch: Dispatch
) => {
	if (activeLink === path) return

	dispatch(setActiveLink(path))
}

const stylesBlock = 'relative overflow-hidden flex mb-3 p-2 rounded-xl'

export const stylesBlockHandler = (
	activeLink: string,
	path: string,
	sidebarStatus: boolean
) => {
	if (activeLink !== path)
		return `${stylesBlock} ${stylesBlockJustify(sidebarStatus)}`
	if (activeLink === path && activeLink !== '/gamesoftheyear') {
		return `${stylesBlock} ${stylesBlockJustify(sidebarStatus)} bg-main-buttons`
	}
	if (activeLink === '/gamesoftheyear') {
		return `${stylesBlock} ${stylesBlockJustify(
			sidebarStatus
		)} bg-game-year-button`
	}
}

const stylesBlockJustify = (sidebarStatus: boolean) => {
	if (sidebarStatus === false) return 'justify-center'

	return ''
}
