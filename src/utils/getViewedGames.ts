import { IGame } from '../types/types'

export const getViewedGames = (games: IGame[]) => {
	const newArr: IGame[] = []
	const jsonArray = localStorage.getItem('viewedGames')
	if (jsonArray) {
		const gamesIds: number[] = JSON.parse(jsonArray)

		gamesIds.forEach(id => {
			const game = games.find(game => game.id === id)
			if (game) {
				return newArr.push(game)
			}
		})
	}

	return newArr
}
