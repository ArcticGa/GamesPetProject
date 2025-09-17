import { setActiveLink } from '../../../redux/slices/sidebarSlices/linksSlice'

export const changePage = (
	index: number,
	activeLink: number,
	dispatch: any
) => {
	if (activeLink === index) return

	dispatch(setActiveLink(index))
}

const stylesBlock = 'relative overflow-hidden flex mb-3 p-2 rounded-xl'

export const stylesBlockHandler = (
	activeLink: number,
	index: number,
	sidebarStatus: boolean
) => {
	if (activeLink !== index)
		return `${stylesBlock} ${stylesBlockJustify(sidebarStatus)}`
	if (activeLink !== 2) {
		return `${stylesBlock} ${stylesBlockJustify(sidebarStatus)} bg-main-buttons`
	}
	if (activeLink === 2) {
		return `${stylesBlock} ${stylesBlockJustify(
			sidebarStatus
		)} bg-game-year-button`
	}
}

const stylesBlockJustify = (sidebarStatus: boolean) => {
	if (sidebarStatus === false) return 'justify-center'

	return ''
}
