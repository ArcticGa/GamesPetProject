import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { fetchFeaturedGamesById } from '../api/fetchData'
import CrownIcon from '../assets/icons/crown-icon.svg'
import GamesBlock from '../components/HomePage/GamesBlock'
import GameYear from '../components/HomePage/GameYear'
import SkeletonHome from '../components/MicroComponents/Skeletons/SkeletonHome'
import '../index.css'
import { fetchGamesYear } from '../redux/slices/dataSlices/gameYearsSlice'
import { fetchSortedGames } from '../redux/slices/dataSlices/sortGames'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { IGame } from '../types/types'
import { arrayGenres, awardsList } from '../utils/miniArraysList'

const Home = () => {
	const dispatch = useAppDispatch()
	const { gamesYear } = useAppSelector(state => state.gameYearSlice)
	const { games, status } = useAppSelector(state => state.gamesSlice)
	const { userData } = useAppSelector(state => state.authSlice)
	const { featuredGames } = useAppSelector(state => state.featuredGamesSlice)
	const [randomGames, setRandomGames] = useState<IGame[]>([])
	const [randomGamesByGenre, setRandomGamesByGenre] = useState<IGame[]>([])
	const [viewedGames, setViewedGames] = useState<IGame[]>([])
	const { sortedGames } = useAppSelector(state => state.sortGamesSlice)

	const getRandomGames = () => {
		const newArr: IGame[] = []
		for (let i = 0; i < 30; i++) {
			const randomNumber = Math.floor(Math.random() * games.length)

			if (games[randomNumber]) {
				const index = newArr.findIndex(
					item => item.id === games[randomNumber].id
				)
				if (index === -1) {
					newArr.push(games[randomNumber])
				}
			}
		}

		setRandomGames(newArr)
	}

	const getViewedGames = () => {
		const newArr: IGame[] = []
		const jsonArray = localStorage.getItem('viewedGames')
		if (jsonArray) {
			const gamesIds: number[] = JSON.parse(jsonArray)
			if (gamesIds.length === 20) console.log('yes')

			gamesIds.forEach(id => {
				const game = games.find(game => game.id === id)
				if (game) {
					return newArr.push(game)
				}
			})
		}

		setViewedGames(newArr)
	}

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

	const getRandomGamesByGenre = (array: IGame[]) => {
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
		if (games) {
			getRandomGames()
			getViewedGames()
		}
	}, [games])

	useEffect(() => {
		if (userData) {
			fetchFeaturedGamesById(userData, dispatch)
		}
	}, [userData])

	useEffect(() => {
		if (gamesYear.length === 0) {
			dispatch(fetchGamesYear(2024))
		}

		const randomGenre = getRandomGenre().toLowerCase()
		dispatch(fetchSortedGames(randomGenre))
	}, [])

	useEffect(() => {
		const array = getRandomGamesByGenre(sortedGames)
		setRandomGamesByGenre(array)
	}, [sortedGames])

	return status === 'loading' ? (
		<SkeletonHome />
	) : status === 'error' ? (
		<div>Ошибка</div>
	) : (
		status === 'success' && (
			<div className='px-20 mt-8'>
				<Swiper
					modules={[Pagination, Autoplay]}
					spaceBetween={15}
					slidesPerView={4}
					grabCursor
					loop
					navigation
					centeredSlides={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					pagination={{
						dynamicBullets: true,
					}}
				>
					{randomGames.map(game => (
						<SwiperSlide key={game.id}>
							<Link to={`/game/${game.id}`}>
								<img
									className='rounded-xl'
									src={game.thumbnail}
									alt='game-img'
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>

				{viewedGames.length !== 0 && (
					<GamesBlock
						array={viewedGames.slice(0, 15)}
						titleBlock='Вы недавно смотрели'
						type='games'
					/>
				)}

				{featuredGames.length !== 0 && (
					<GamesBlock
						array={featuredGames}
						titleBlock='Ваши избранные игры'
						type='games'
					/>
				)}

				{randomGamesByGenre.length !== 0 && (
					<GamesBlock
						array={randomGamesByGenre}
						titleBlock='Рекомендации'
						type='games'
					/>
				)}

				<div className='mb-10'>
					<div className='flex items-center justify-between mb-4'>
						<div className='flex items-center text-xl text-[#f7b62a]'>
							Игры года: 2024
							<img
								className='w-10 rotate-25 ml-2'
								src={CrownIcon}
								alt='crown-icon'
							/>
						</div>
					</div>
					<div className='flex justify-between'>
						{awardsList.slice(0, 3).map(award => (
							<GameYear key={award.id} award={award} gamesYear={gamesYear} />
						))}
					</div>
				</div>

				{!userData && (
					<div className='flex flex-col items-center justify-center mb-10'>
						<Link
							to={'/auth'}
							className='max-w-[600px] text-center bg-main-blocks py-6 rounded-2xl border-1 border-main-background hover:border-links-and-borders transition-all delay-20'
						>
							<div className='mb-4'>
								Если вы еще не зарегистрированы, советую это сделать. Вы сможете
								добавлять игры в список Избранных, писать обзоры, а так же
								читать и оценивать чужие. Или написать лично разработчику о
								ваших пожеланиях (хороших или плохих)
							</div>
							<span className='text-links-and-borders border-b-1 text-xl '>
								Зарегистрироваться
							</span>
						</Link>
					</div>
				)}
			</div>
		)
	)
}

export default Home
