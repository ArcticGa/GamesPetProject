import { IGame } from '../../types/types'

export const useFilterByGenre = (arr: IGame[], value: string | undefined) => {
	if (value === undefined) return

	const filteredGames = arr.filter(item => {
		return item.genre.toLowerCase().includes(value.toLowerCase())
	})

	return filteredGames
}
