import { useState } from 'react'
import { Link } from 'react-router'
import { useAppSelector } from '../../../../redux/store'
import Pagination from '../../../MicroComponents/Pagination'
import SkeletonGame from '../../../MicroComponents/Skeletons/SkeletonGame'

const GamesList = () => {
	const { sortedGames, status } = useAppSelector(state => state.sortGamesSlice)

	const [currentPage, setCurrentPage] = useState(1)

	const lastGameIndex = currentPage * 12
	const firstGameIndex = lastGameIndex - 12

	return (
		<>
			<div className='grid grid-cols-4 gap-4 flex-1 max-xl:grid-cols-3 max-md:grid-cols-2 max-md:gap-2'>
				{status === 'loading' ? (
					[...new Array(12)].map((_, index) => (
						<SkeletonGame key={index} width={300} height={250} />
					))
				) : status === 'error' ? (
					<div>Ошибка</div>
				) : (
					sortedGames.slice(firstGameIndex, lastGameIndex).map(game => (
						<Link className='' to={`/game/${game.id}`} key={game.id}>
							<img
								className='rounded-xl'
								src={game.thumbnail}
								alt='game-image'
							/>
							<div className='text-center mt-2 max-lg:text-sm'>
								{game.title}
							</div>
						</Link>
					))
				)}
			</div>

			{status === 'success' && (
				<Pagination
					gamesArray={sortedGames}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</>
	)
}

export default GamesList
