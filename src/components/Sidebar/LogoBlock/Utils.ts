export const stylesLogo = (sidebarStatus: boolean) => {
	const basedStyles = 'flex items-center mb-6 relative'
	if (sidebarStatus) return `${basedStyles} justify-between`
	return `${basedStyles} justify-center`
}
