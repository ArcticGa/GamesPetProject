import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Review from '../components/GamePage/GameReviewsBlock/Review'
import MainProfileBlock from '../components/ProfilePage/MainProfileBlock'
import SortBtnsBlock from '../components/ProfilePage/SortBtnsBlock'
import { fetchOwnReviews } from '../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { IFullGame, IReview } from '../types/types'

const BASE_URL = import.meta.env.VITE_GAMES_BASE_API_URL
const RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY

const UserProfilePage = () => {
	const dispatch = useAppDispatch()
	const { userData } = useAppSelector(state => state.authSlice)
	const { reviews } = useAppSelector(state => state.gameReviewsSlice)

	const [activeSortBtn, setActiveSortBtn] = useState(0)
	const [featuredGames, setFeaturedGames] = useState<IFullGame[]>([])
	const [likedReviews, setLikedReviews] = useState<IReview[]>([])

	useEffect(() => {
		if (userData) {
			const featGames = userData.featuredGames

			const task = async (id: number) => {
				try {
					const response = await axios.get(`${BASE_URL}/game`, {
						params: { id },
						headers: {
							'x-rapidapi-key': `${RAPIDAPI_KEY}`,
							'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
						},
					})

					return response.data
				} catch (err) {
					console.log(err)
				}
			}

			const allTasks = featGames.map(gameId => {
				return task(gameId)
			})

			Promise.all(allTasks).then(result => setFeaturedGames(result))
		}
	}, [userData])

	useEffect(() => {
		if (userData) {
			const likedReviews = userData.likedReviews

			const task = async (id: string) => {
				try {
					const { data } = await axios.get(`http://localhost:5000/review/${id}`)

					return data
				} catch (err) {
					console.log(err)
				}
			}

			const allTasks = likedReviews.map(reviewId => {
				return task(reviewId)
			})

			Promise.all(allTasks).then(result => setLikedReviews(result))
		}
	}, [userData])

	useEffect(() => {
		if (userData) {
			dispatch(fetchOwnReviews(userData._id))
		}
	}, [userData, dispatch])

	return userData ? (
		<div className='px-4'>
			<MainProfileBlock userData={userData} />
			<SortBtnsBlock
				activeSortBtn={activeSortBtn}
				setActiveSortBtn={setActiveSortBtn}
			/>
			{activeSortBtn === 0 && (
				<div className='flex items-center flex-wrap mx-20'>
					{featuredGames.map(
						game =>
							game && (
								<Link key={game.id} to={`/game/${game.id}`} className='mb-3'>
									<img
										className='rounded-2xl w-79 mx-3'
										src={game.thumbnail}
										alt='game-icon'
									/>
									<div className='text-center mt-2 text-lg'>{game.title}</div>
								</Link>
							)
					)}
				</div>
			)}

			{activeSortBtn === 1 && (
				<div className='flex items-center justify-center flex-wrap'>
					{reviews.map(review => (
						<Review key={review._id} data={review} />
					))}
				</div>
			)}

			{activeSortBtn === 2 && (
				<div className='flex items-center justify-center flex-wrap'>
					{likedReviews.map(
						review => review !== undefined && <Review data={review} />
					)}
				</div>
			)}
		</div>
	) : (
		<div className='flex flex-col justify-center items-center h-[920px] '>
			<div className='text-2xl'>Вы не авторизованы 😔</div>
			<Link
				to={'/auth'}
				className='text-lg text-links-and-borders border-b-1 mt-4'
			>
				Войти в аккаунт
			</Link>
		</div>
	)
}

export default UserProfilePage
