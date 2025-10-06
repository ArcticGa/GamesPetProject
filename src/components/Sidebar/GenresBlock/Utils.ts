import { SetStateAction } from 'react'

export const filterGenres = (
	arrayGenres: string[],
	searchGenreValue: string,
	setFilteredGenresArray: React.Dispatch<SetStateAction<string[]>>
) => {
	const filteredArray = arrayGenres.filter(item => {
		return item.toLowerCase().includes(searchGenreValue.toLowerCase())
	})

	setFilteredGenresArray(filteredArray)
}

export const stylesCategories = (sidebarStatus: boolean) => {
	const basedStyles = 'flex items-center mb-3 cursor-pointer'
	if (sidebarStatus) return `${basedStyles} justify-between pl-2`
	return `${basedStyles} justify-center`
}
