import { useEffect, useState } from 'react'
import { fetchFeaturedGamesById, fetchLikedReviewsById } from '../api/fetchData'
import RenderInfoBlock from '../components/ProfilePage/DataRenderComponent/RenderInfoBlock'
import MainProfileBlock from '../components/ProfilePage/MainInfoComponent/MainProfileBlock'
import NotAuth from '../components/ProfilePage/NotAuth'
import SortBtnsBlock from '../components/ProfilePage/SortComponent/SortBtnsBlock'
import { fetchOwnReviews } from '../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'

const UserProfilePage = () => {
	const dispatch = useAppDispatch()
	const { userData } = useAppSelector(state => state.authSlice)
	const { reviews } = useAppSelector(state => state.gameReviewsSlice)
	const { featuredGames } = useAppSelector(state => state.featuredGamesSlice)
	const { likedReviews } = useAppSelector(state => state.likedReviewsSlice)

	const [activeSortBtn, setActiveSortBtn] = useState(0)

	useEffect(() => {
		if (userData) {
			dispatch(fetchOwnReviews(userData._id))
			fetchFeaturedGamesById(userData, dispatch)
			fetchLikedReviewsById(userData, dispatch)
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
				<RenderInfoBlock array={featuredGames} arrayType='games' isOwn={true} />
			)}

			{activeSortBtn === 1 && (
				<RenderInfoBlock array={reviews} arrayType='ownReviews' isOwn={true} />
			)}

			{activeSortBtn === 2 && (
				<RenderInfoBlock
					array={likedReviews}
					arrayType='likedReviews'
					isOwn={true}
				/>
			)}
		</div>
	) : (
		<NotAuth />
	)
}

export default UserProfilePage
