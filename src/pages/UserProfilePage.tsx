import { useEffect, useState } from 'react'
import { fetchFeaturedGamesById, fetchLikedReviewsById } from '../api/fetchData'
import SkeletonProfile from '../components/MicroComponents/Skeletons/SkeletonProfile'
import SortButton from '../components/MicroComponents/SortButton'
import RenderInfoBlock from '../components/ProfilePage/DataRenderComponent/RenderInfoBlock'
import MainProfileBlock from '../components/ProfilePage/MainInfoComponent/MainProfileBlock'
import NotAuth from '../components/ProfilePage/NotAuth'
import { fetchOwnReviews } from '../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { arraySortProfileBtns } from '../utils/miniArraysList'

const UserProfilePage = () => {
	const dispatch = useAppDispatch()
	const { userData, status } = useAppSelector(state => state.authSlice)
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
	}, [userData])

	return status === 'loading' ? (
		<SkeletonProfile />
	) : status === 'error' ? (
		<div>Ошибка</div>
	) : status === 'success' && userData ? (
		<div className='px-4 max-lg:p-0'>
			<MainProfileBlock userData={userData} isOwn={true} />
			<div className='flex items-center justify-center mb-8 flex-wrap'>
				{arraySortProfileBtns.map((button, index) => (
					<SortButton
						key={index}
						activeSortItem={activeSortBtn}
						setActiveSortItem={setActiveSortBtn}
						number={index}
					>
						{button}
					</SortButton>
				))}
			</div>

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
