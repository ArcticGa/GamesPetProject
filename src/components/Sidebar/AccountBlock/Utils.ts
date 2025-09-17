export const stylesLogin = (sidebarStatus: boolean) => {
	const basedStyles = 'bg-main-background rounded-2xl relative'
	if (sidebarStatus) return `${basedStyles} p-3.5`
	return `${basedStyles} p-3`
}
