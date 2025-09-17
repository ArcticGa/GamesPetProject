export const stylesCategories = (sidebarStatus: boolean) => {
	const basedStyles = 'flex items-center mb-3 cursor-pointer'
	if (sidebarStatus) return `${basedStyles} justify-between pl-2`
	return `${basedStyles} justify-center`
}
