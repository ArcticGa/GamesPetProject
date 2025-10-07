import { Link } from 'react-router'
import { IFullGame } from '../../../types/types'

const GameBlock = ({ game }: { game: IFullGame }) => {
	return (
		<Link key={game.id} to={`/game/${game.id}`} className='mb-3'>
			<img
				className='rounded-2xl w-79 mx-3'
				src={game.thumbnail}
				alt='game-icon'
			/>
			<div className='text-center mt-2 text-lg'>{game.title}</div>
		</Link>
	)
}

export default GameBlock
