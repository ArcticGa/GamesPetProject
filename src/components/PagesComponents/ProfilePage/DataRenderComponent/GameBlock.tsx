import { Link } from 'react-router'
import DeleteIcon from '../../../../assets/icons/close-icon.svg'
import { fetchUpdateUser } from '../../../../redux/slices/auth'
import { useAppDispatch } from '../../../../redux/store'
import { IFullGame } from '../../../../types/types'

const GameBlock = ({ game, isOwn }: { game: IFullGame; isOwn: boolean }) => {
	const dispatch = useAppDispatch()
	const handleDelete = () => {
		dispatch(fetchUpdateUser({ removeGameId: game.id }))
	}

	return (
		<div className='relative mb-4'>
			{isOwn && (
				<div
					onClick={handleDelete}
					className='absolute -top-4 right-0 z-10 rounded-full p-1 bg-red-800 cursor-pointer'
				>
					<img src={DeleteIcon} alt='delete-icon' />
				</div>
			)}
			<Link key={game.id} to={`/game/${game.id}`} className='mb-3 relative'>
				<img
					className='rounded-2xl w-78 mx-3'
					src={game.thumbnail}
					alt='game-icon'
				/>
				<div className='text-center mt-2 text-lg'>{game.title}</div>
			</Link>
		</div>
	)
}

export default GameBlock
