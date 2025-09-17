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
