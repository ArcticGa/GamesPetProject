import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { fetchSortedGames } from '../redux/slices/dataSlices/sortGames'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { IGame } from '../types/types'
import { arrayGenres } from '../utils/miniArraysList'

const Recommendations = () => {
	const [randomGames, setRandomGames] = useState<IGame[]>([])

	const dispatch = useAppDispatch()
	const { sortedGames, status } = useAppSelector(state => state.sortGamesSlice)

	const getRandomGenre = () => {
		const lastGenre = localStorage.getItem('lastGenre')
		if (lastGenre) {
			if (lastGenre === 'Card Game') return 'card'

			return lastGenre
		} else {
			const randomGenreIndex = Math.floor(Math.random() * arrayGenres.length)
			return arrayGenres[randomGenreIndex]
		}
	}

	const getRandomGames = (array: IGame[]) => {
		const newArr: IGame[] = []
		for (let i = 0; i < 12; i++) {
			const randomNumber = Math.floor(Math.random() * array.length)

			if (array[randomNumber]) {
				const index = newArr.findIndex(
					item => item.id === array[randomNumber].id
				)
				if (index === -1) {
					newArr.push(array[randomNumber])
				}
			}
		}

		return newArr
	}

	useEffect(() => {
		const randomGenre = getRandomGenre().toLowerCase()
		dispatch(fetchSortedGames({ category: randomGenre }))
	}, [])

	useEffect(() => {
		const array = getRandomGames(sortedGames)
		setRandomGames(array)
	}, [sortedGames])

	return status === 'loading' ? (
		<div>Загрузка</div>
	) : status === 'error' ? (
		<div>Ошибка</div>
	) : (
		status === 'success' && (
			<div className='pt-6'>
				<div className='flex items-center mb-6'>
					<div className='text-xl font-bold'>Рекомендации для вас</div>
					<div className='bg-main-blocks rounded-2xl p-2 max-w-[300px] text-xs text-center ml-4'>
						Рекомендации подбираются по категориям игр которые вы смотрите
					</div>
				</div>
				<div className='grid grid-cols-4 gap-5 flex-1'>
					{randomGames.map(game => (
						<Link to={`/game/${game.id}`} key={game.id}>
							<img
								className='rounded-xl'
								src={game.thumbnail}
								alt='game-image'
							/>
							<div className='text-center mt-2 text-lg'>{game.title}</div>
						</Link>
					))}
				</div>
			</div>
		)
	)
}

export default Recommendations
