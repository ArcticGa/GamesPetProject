import { IFullGame, IGame } from '../types/types'
import { arrayGenres } from './miniArraysList'

export const getRandomScreenshot = (game: IFullGame) => {
	if (!game.screenshots) return

	const randomIndex = Math.ceil(Math.random() * game.screenshots.length) - 1
	return game?.screenshots[randomIndex]?.image
}

export const getRandomGames = (games: IGame[], count: number) => {
	const newArr: IGame[] = []
	for (let i = 0; i < count; i++) {
		const randomNumber = Math.floor(Math.random() * games.length)

		if (games[randomNumber]) {
			const index = newArr.findIndex(item => item.id === games[randomNumber].id)

			if (index === -1) {
				newArr.push(games[randomNumber])
			}
		}
	}

	return newArr
}

export const getRandomGenre = () => {
	const lastGenre = localStorage.getItem('lastGenre')
	if (lastGenre) {
		if (lastGenre === 'Card Game') return 'card'
		if (lastGenre === 'rpg') return 'mmorpg'
		return lastGenre
	} else {
		const randomGenreIndex = Math.floor(Math.random() * arrayGenres.length)
		return arrayGenres[randomGenreIndex]
	}
}
