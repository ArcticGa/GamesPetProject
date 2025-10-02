import { Link } from 'react-router'
import { IGame } from '../../types/types'

interface GamesListProps {
	gamesArray: IGame[]
	currentPage: number
}

const GamesList = ({ gamesArray, currentPage }: GamesListProps) => {
	const lastGameIndex = currentPage * 12
	const firstGameIndex = lastGameIndex - 12

	return (
		<div className='grid grid-cols-4 gap-5 flex-1'>
			{gamesArray.slice(firstGameIndex, lastGameIndex).map(game => (
				<Link to={`/game/${game.id}`} key={game.id}>
					<img className='rounded-xl' src={game.thumbnail} alt='game-image' />
					<div className='text-center mt-2 text-lg'>{game.title}</div>
				</Link>
			))}
		</div>
	)
}

export default GamesList
