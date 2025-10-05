import { useEffect, useState } from 'react'
import { fetchGamesById, fetchReviewsById } from '../api/fetchData'
import MainProfileBlock from '../components/ProfilePage/MainProfileBlock'
import NotAuth from '../components/ProfilePage/NotAuth'
import RenderInfoBlock from '../components/ProfilePage/RenderInfoBlock'
import SortBtnsBlock from '../components/ProfilePage/SortBtnsBlock'
import { fetchOwnReviews } from '../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { IFullGame, IReview } from '../types/types'

const UserProfilePage = () => {
	const dispatch = useAppDispatch()
	const { userData } = useAppSelector(state => state.authSlice)
	const { reviews } = useAppSelector(state => state.gameReviewsSlice)

	const [activeSortBtn, setActiveSortBtn] = useState(0)
	const [featuredGames, setFeaturedGames] = useState<IFullGame[]>([])
	const [likedReviews, setLikedReviews] = useState<IReview[]>([])

	useEffect(() => {
		if (userData) {
			dispatch(fetchOwnReviews(userData._id))
			fetchGamesById(userData, setFeaturedGames)
			fetchReviewsById(userData, setLikedReviews)
		}
	}, [userData, dispatch])

	return userData ? (
		<div className='px-4'>
			<MainProfileBlock userData={userData} isOwn={true} />
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
	) : (
		<NotAuth />
	)
}

export default UserProfilePage
