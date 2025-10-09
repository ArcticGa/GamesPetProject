import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppSelector } from '../redux/store'

import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import 'swiper/css/bundle'
import GamesBlock from '../components/HomePage/GamesBlock'
import '../index.css'
import { IGame } from '../types/types'
import { arrayGenres } from '../utils/miniArrays'

const Home = () => {
	const { games, status } = useAppSelector(state => state.gamesSlice)
	const { featuredGames } = useAppSelector(state => state.featuredGamesSlice)
	const [randomGames, setRandomGames] = useState<IGame[]>([])
	const [viewedGames, setViewedGames] = useState<IGame[]>([])

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
			gamesIds.forEach(id => {
				const game = games.find(game => game.id === id)
				if (game) {
					return newArr.push(game)
				}
			})
		}

		setViewedGames(newArr)
	}

	useEffect(() => {
		if (games) {
			getRandomGames()
			getViewedGames()
		}
	}, [games])

	return status === 'loading' ? (
		<div>Загрузка...</div>
	) : status === 'error' ? (
		<div>Ошибка...</div>
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
					scrollbar={{ draggable: true }}
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
						array={viewedGames}
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

				<GamesBlock array={arrayGenres} titleBlock='Жанры' type='genres' />
			</div>
		)
	)
}

export default Home
