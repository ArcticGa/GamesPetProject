import { SetStateAction } from 'react'

export const filterGenres = (
	arrayGenres: string[],
	searchGenreValue: string,
	setFilteredGenresArray: {
		(value: SetStateAction<string[]>): void
		(arg0: string[]): void
	}
) => {
	const filteredArray = arrayGenres.filter(item => {
		return item.toLowerCase().includes(searchGenreValue.toLowerCase())
	})

	setFilteredGenresArray(filteredArray)
}
