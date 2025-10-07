import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { fetchGamesById, fetchReviewsById } from '../api/fetchData'
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

	const [activeSortBtn, setActiveSortBtn] = useState(0)
	const [featuredGames, setFeaturedGames] = useState<IFullGame[]>([])
	const [likedReviews, setLikedReviews] = useState<IReview[]>([])

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
			fetchGamesById(user, setFeaturedGames)
			fetchReviewsById(user, setLikedReviews)
		}
	}, [user, dispatch])

	return status === 'loading' ? (
		<div>Загрузка</div>
	) : status === 'error' ? (
		<div>Ошибка</div>
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
