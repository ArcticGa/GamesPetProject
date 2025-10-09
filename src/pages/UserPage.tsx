import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
	fetchFeaturedGamesForOutsider,
	fetchLikedReviewsForOutsider,
} from '../api/fetchData'
import Gif from '../assets/GameImages/notfoundimg.gif'
import RenderInfoBlock from '../components/ProfilePage/DataRenderComponent/RenderInfoBlock'
import MainProfileBlock from '../components/ProfilePage/MainInfoComponent/MainProfileBlock'
import SortBtnsBlock from '../components/ProfilePage/SortComponent/SortBtnsBlock'
import { fetchOwnReviews } from '../redux/slices/dataSlices/gameReviewsSlice'
import { fetchUserById } from '../redux/slices/dataSlices/userById'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { IFullGame, IReview } from '../types/types'

const UserPage = () => {
	const dispatch = useAppDispatch()
	const { userId } = useParams()
	const navigate = useNavigate()
	const { userData } = useAppSelector(state => state.authSlice)
	const { user, status } = useAppSelector(state => state.getUserByIdSlice)
	const { reviews } = useAppSelector(state => state.gameReviewsSlice)

	const [likedReviews, setLikedReviews] = useState<IReview[]>([])
	const [featuredGames, setFeaturedGames] = useState<IFullGame[]>([])
	const [activeSortBtn, setActiveSortBtn] = useState(0)

	useEffect(() => {
		if (userData) {
			if (userData._id === userId) {
				navigate('/profile')
			}
		}
	}, [userData, userId, navigate])

	useEffect(() => {
		if (userId && !user) {
			dispatch(fetchUserById(userId))
		}
	}, [userId, user, dispatch])

	useEffect(() => {
		if (user) {
			dispatch(fetchOwnReviews(user._id))
			fetchLikedReviewsForOutsider(user, setLikedReviews)
			fetchFeaturedGamesForOutsider(user, setFeaturedGames)
		}
	}, [user, dispatch])

	return status === 'loading' ? (
		<div>Загрузка</div>
	) : status === 'error' || user === null ? (
		<div className='flex flex-col items-center justify-center h-[920px]'>
			<div className='text-2xl font-bold'>Пользователь не найден</div>
			<img src={Gif} alt='gif' />
		</div>
	) : (
		status === 'success' &&
		user && (
			<div className='px-4'>
				<MainProfileBlock userData={user} isOwn={false} />
				<SortBtnsBlock
					activeSortBtn={activeSortBtn}
					setActiveSortBtn={setActiveSortBtn}
				/>
				{activeSortBtn === 0 && (
					<RenderInfoBlock array={featuredGames} arrayType='games' />
				)}

				{activeSortBtn === 1 && (
					<RenderInfoBlock array={reviews} arrayType='ownReviews' />
				)}

				{activeSortBtn === 2 && (
					<RenderInfoBlock array={likedReviews} arrayType='likedReviews' />
				)}
			</div>
		)
	)
}

export default UserPage
