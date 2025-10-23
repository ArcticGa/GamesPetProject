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

export const stylesBlockHandler = (activeLink: string, path: string) => {
	if (activeLink !== path) return `${stylesBlock}`
	if (activeLink === path && activeLink !== '/gamesoftheyear') {
		return `${stylesBlock} bg-links-and-borders`
	}
	if (activeLink === '/gamesoftheyear') {
		return `${stylesBlock} bg-game-year-button`
	}
}
