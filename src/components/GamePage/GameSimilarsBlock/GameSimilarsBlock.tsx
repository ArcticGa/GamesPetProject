import { useEffect, useState } from 'react'
import '../../../index.css'
import { useAppSelector } from '../../../redux/store'
import { IGame } from '../../../types/types'
import { filterByGenre } from '../../../utils/filterByGenre'
import GamesBlock from '../../HomePage/GamesBlock'

const GameSimilarsBlock = () => {
	const [similarGames, setSimilarGames] = useState<IGame[]>([])
	const { games } = useAppSelector(state => state.gamesSlice)
	const { game } = useAppSelector(state => state.gameByIdSlice)

	const filteredArr = filterByGenre(games, game?.genre)
	const updatedArr = filteredArr?.filter(item => item?.id !== game?.id)

	useEffect(() => {
		if (updatedArr) {
			setSimilarGames(updatedArr)
		}
	}, [games, game])

	return (
		<div>
			{similarGames.length !== 0 && (
				<GamesBlock
					array={similarGames}
					titleBlock='Похожие игры'
					type='games'
				/>
			)}
		</div>
	)
}

export default GameSimilarsBlock
