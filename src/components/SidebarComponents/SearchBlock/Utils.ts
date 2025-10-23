import { IGame } from '../../../types/types'

export const filterFunc = (value: string, arr: IGame[]) => {
	return arr.filter(game => {
		return game.title.toLowerCase().includes(value.toLowerCase())
	})
}
