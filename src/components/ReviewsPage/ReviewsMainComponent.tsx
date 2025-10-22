import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Gif from '../../assets/GameImages/notfoundimg.gif'
import { fetchGameReviews } from '../../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { sortParamsArr } from '../../utils/miniArraysList'
import AddReview from '../AddReview/AddReview'
import SortButton from '../MicroComponents/SortButton'
import ReviewFull from './ReviewFull'
import { sortReviewsArray } from './Utils'

const ReviewsMainComponent = () => {
	const dispatch = useAppDispatch()
	const { reviews, status } = useAppSelector(state => state.gameReviewsSlice)
	const { userData } = useAppSelector(state => state.authSlice)
	const { id } = useParams()

	const [activeSortItem, setActiveSortItem] = useState(0)
	const [sortedArray, setSortedArray] = useState(reviews)
	const [isAddReview, setIsAddReview] = useState(false)

	useEffect(() => {
		if (id) {
			dispatch(fetchGameReviews(id))
		}
	}, [id, dispatch])

	useEffect(() => {
		sortReviewsArray(activeSortItem, setSortedArray, reviews)
	}, [activeSortItem, reviews])

	return (
		<>
			<div className='flex items-center justify-between mb-8 max-xl:flex-col max-xl:mb-2'>
				<div className='flex flex-wrap '>
					{sortParamsArr.map((param, index) => (
						<SortButton
							key={index}
							setActiveSortItem={setActiveSortItem}
							activeSortItem={activeSortItem}
							number={index}
						>
							{param}
						</SortButton>
					))}
				</div>
				{userData && (
					<div
						className='cursor-pointer bg-links-and-borders py-2 px-6 rounded-xl text-nowrap text-center max-xl:my-6 max-xl:w-full'
						onClick={() => setIsAddReview(true)}
					>
						Добавить обзор
					</div>
				)}
			</div>
			{isAddReview && userData && (
				<AddReview userData={userData} setIsAddReview={setIsAddReview} />
			)}

			{sortedArray.length !== 0 ? (
				<div className='flex flex-wrap'>
					{sortedArray.map(review => (
						<ReviewFull key={review._id} review={review} />
					))}
				</div>
			) : (
				<div
					className={`flex flex-col items-center max-xl:mt-1 ${
						isAddReview ? 'mt-10' : 'mt-50'
					}`}
				>
					<div className='text-2xl font-bold'>Обзоров пока нет</div>
					<img src={Gif} alt='gif' />
				</div>
			)}
		</>
	)
}

export default ReviewsMainComponent
