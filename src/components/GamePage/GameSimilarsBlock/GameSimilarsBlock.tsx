import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAppSelector } from '../../../redux/store'
import { IGame } from '../../../types/types'
import { useFilterByGenre } from '../../../utils/hooks/filterByGenre'

const GameSimilarsBlock = () => {
	const [similarGames, setSimilarGames] = useState<IGame[]>([])
	const { games } = useAppSelector(state => state.gamesSlice)
	const { game } = useAppSelector(state => state.gameByIdSlice)

	const filteredArr = useFilterByGenre(games, game?.genre)
	const updatedArr = filteredArr?.filter(item => item?.id !== game?.id)

	useEffect(() => {
		if (updatedArr) {
			setSimilarGames(updatedArr)
		}
	}, [games, game])

	return (
		<div>
			<div className='mb-4 text-xl'>Похожие игры</div>
			<div className='flex max-w-full overflow-x-auto scrollbar'>
				{similarGames.map(game => (
					<Link to={`/game/${game.id}`} key={game.id} className='mr-4'>
						<img
							className='max-w-70 mb-2 rounded-xl'
							src={game.thumbnail}
							alt='game-img'
						/>
						<div className='text-center text-lg'>{game.title}</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default GameSimilarsBlock
