import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
	fetchFeaturedGamesForOutsider,
	fetchLikedReviewsForOutsider,
} from '../api/fetchData'
import NotFound from '../components/MicroComponents/NotFound'
import SkeletonProfile from '../components/MicroComponents/Skeletons/SkeletonProfile'
import SortButton from '../components/MicroComponents/SortButton'
import RenderInfoBlock from '../components/PagesComponents/ProfilePage/DataRenderComponent/RenderInfoBlock'
import MainProfileBlock from '../components/PagesComponents/ProfilePage/MainInfoComponent/MainProfileBlock'
import { fetchOwnReviews } from '../redux/slices/dataSlices/gameReviewsSlice'
import { fetchUserById } from '../redux/slices/dataSlices/userById'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { IFullGame, IReview } from '../types/types'
import { arraySortProfileBtns } from '../utils/miniArraysList'

const UserPage = () => {
	const dispatch = useAppDispatch()
	const { userId } = useParams()
	const { user, status } = useAppSelector(state => state.getUserByIdSlice)
	const { reviews } = useAppSelector(state => state.gameReviewsSlice)

	const [likedReviews, setLikedReviews] = useState<IReview[]>([])
	const [featuredGames, setFeaturedGames] = useState<IFullGame[]>([])
	const [activeSortBtn, setActiveSortBtn] = useState(0)

	useEffect(() => {
		if (userId && !user) {
			dispatch(fetchUserById(userId))
		}
	}, [userId, user])

	useEffect(() => {
		if (user) {
			dispatch(fetchOwnReviews(user._id))
			fetchLikedReviewsForOutsider(user, setLikedReviews)
			fetchFeaturedGamesForOutsider(user, setFeaturedGames)
		}
	}, [user])

	return status === 'loading' ? (
		<SkeletonProfile />
	) : status === 'error' || user === null ? (
		<NotFound text='Пользователь не найден' />
	) : (
		status === 'success' &&
		user && (
			<div className='px-4 max-sm:p-0'>
				<MainProfileBlock userData={user} isOwn={false} />
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
					<RenderInfoBlock
						array={featuredGames}
						arrayType='games'
						isOwn={false}
					/>
				)}

				{activeSortBtn === 1 && (
					<RenderInfoBlock
						array={reviews}
						arrayType='ownReviews'
						isOwn={false}
					/>
				)}

				{activeSortBtn === 2 && (
					<RenderInfoBlock
						array={likedReviews}
						arrayType='likedReviews'
						isOwn={false}
					/>
				)}
			</div>
		)
	)
}

export default UserPage
