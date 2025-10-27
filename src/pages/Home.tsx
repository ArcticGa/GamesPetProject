import { useEffect, useState } from 'react'
import { fetchFeaturedGamesById } from '../api/fetchData'
import Footer from '../components/Footer'
import SkeletonHome from '../components/MicroComponents/Skeletons/SkeletonHome'
import AuthRecommendation from '../components/PagesComponents/HomePage/AuthRecommendation'
import GamesYear from '../components/PagesComponents/HomePage/GamesYear'
import MainSwiperBlock from '../components/PagesComponents/HomePage/MainSwiperBlock'
import SwiperBlock from '../components/PagesComponents/HomePage/SwiperBlock'
import '../index.css'
import { fetchGamesYear } from '../redux/slices/dataSlices/gameYearsSlice'
import { fetchSortedGames } from '../redux/slices/dataSlices/sortGames'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { IGame } from '../types/types'
import { getRandomGames, getRandomGenre } from '../utils/getRandomItems'
import { getViewedGames } from '../utils/getViewedGames'

const Home = () => {
	const dispatch = useAppDispatch()

	const { gamesYear } = useAppSelector(state => state.gameYearSlice)
	const { games, status } = useAppSelector(state => state.gamesSlice)
	const { userData } = useAppSelector(state => state.authSlice)
	const { featuredGames } = useAppSelector(state => state.featuredGamesSlice)
	const { sortedGames } = useAppSelector(state => state.sortGamesSlice)

	const [viewedGames, setViewedGames] = useState<IGame[]>([])
	const [randomGamesByGenre, setRandomGamesByGenre] = useState<IGame[]>([])

	useEffect(() => {
		if (games) {
			setViewedGames(getViewedGames(games))
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
		dispatch(fetchSortedGames({ category: randomGenre }))
	}, [])

	useEffect(() => {
		setRandomGamesByGenre(getRandomGames(sortedGames, 12))
	}, [sortedGames])

	return status === 'loading' ? (
		<SkeletonHome />
	) : status === 'error' ? (
		<div>
			Ошибка (Если ваш IP Российский, советую включить VPN, или использовать
			прокси)
		</div>
	) : (
		status === 'success' && (
			<div className='px-20 mt-8 max-xl:px-0'>
				<MainSwiperBlock />

				{viewedGames.length !== 0 && (
					<SwiperBlock
						array={viewedGames.slice(0, 15)}
						titleBlock='Вы недавно смотрели'
						type='games'
					/>
				)}

				{featuredGames.length !== 0 && (
					<SwiperBlock
						array={featuredGames}
						titleBlock='Ваши избранные игры'
						type='games'
					/>
				)}

				{randomGamesByGenre.length !== 0 && (
					<SwiperBlock
						array={randomGamesByGenre}
						titleBlock='Рекомендации'
						type='games'
					/>
				)}

				{gamesYear && <GamesYear gamesYear={gamesYear} />}
				{!userData && <AuthRecommendation />}
				<Footer />
			</div>
		)
	)
}

export default Home
