import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import SkeletonGame from '../components/MicroComponents/Skeletons/SkeletonGame'
import HeaderRecommendations from '../components/PagesComponents/RecommendationsPage/HeaderRecommendations'
import { fetchSortedGames } from '../redux/slices/dataSlices/sortGames'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { IGame } from '../types/types'
import { getRandomGames, getRandomGenre } from '../utils/getRandomItems'

const Recommendations = () => {
	const dispatch = useAppDispatch()
	const { sortedGames, status } = useAppSelector(state => state.sortGamesSlice)

	const [randomGames, setRandomGames] = useState<IGame[]>([])

	useEffect(() => {
		const randomGenre = getRandomGenre().toLowerCase()
		dispatch(fetchSortedGames({ category: randomGenre }))
	}, [])

	useEffect(() => {
		setRandomGames(getRandomGames(sortedGames, 12))
	}, [sortedGames])

	return (
		<div className='pt-4'>
			<HeaderRecommendations />

			{status === 'loading' ? (
				<div className='grid grid-cols-4 gap-5 flex-1'>
					{[...new Array(12)].map((_, index) => (
						<SkeletonGame key={index} width={380} height={250} />
					))}
				</div>
			) : status === 'error' ? (
				<div>
					Ошибка (Если ваш IP Российский, советую включить VPN, или использовать
					прокси)
				</div>
			) : (
				status === 'success' && (
					<div className='grid grid-cols-4 gap-5 flex-1 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-2'>
						{randomGames.map(game => (
							<Link to={`/game/${game.id}`} key={game.id}>
								<img
									className='rounded-xl'
									src={`/api/image?url=${encodeURIComponent(game.thumbnail)}`}
									alt='game-image'
								/>
								<div className='text-center mt-2 text-lg max-lg:text-base max-sm:text-xs'>
									{game.title}
								</div>
							</Link>
						))}
					</div>
				)
			)}
		</div>
	)
}

export default Recommendations
