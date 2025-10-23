import { IFullGame } from '../types/types'

export const addGameToViewedArray = (game: IFullGame) => {
	if (!game.id) return

	const jsonArray = localStorage.getItem('viewedGames')
	if (jsonArray) {
		const array: number[] = JSON.parse(jsonArray)
		const item = array.find(item => item === game.id)
		if (!item) {
			array.unshift(game.id)
			localStorage.setItem('viewedGames', JSON.stringify(array))
		}
	} else {
		localStorage.setItem('viewedGames', JSON.stringify([game.id]))
	}
}
