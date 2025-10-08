import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchGameReviews } from '../../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { sortParamsArr } from '../../utils/miniArrays'
import AddReview from '../AddReview/AddReview'
import ReviewFull from './ReviewFull'
import SortBlock from './SortBlock'
import { sortReviewsArray } from './Utils'

const ReviewsMainComponent = () => {
	const dispatch = useAppDispatch()
	const { reviews } = useAppSelector(state => state.gameReviewsSlice)
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
			<div className='flex items-center justify-between mb-8'>
				<div className='flex'>
					{sortParamsArr.map((param, index) => (
						<SortBlock
							key={index}
							setActiveSortItem={setActiveSortItem}
							activeSortItem={activeSortItem}
							number={index}
						>
							{param}
						</SortBlock>
					))}
				</div>
				<div
					className='cursor-pointer bg-links-and-borders py-2 px-6 rounded-xl'
					onClick={() => setIsAddReview(true)}
				>
					Добавить обзор
				</div>
			</div>
			{isAddReview && userData && (
				<AddReview userData={userData} setIsAddReview={setIsAddReview} />
			)}
			<div className='flex flex-wrap'>
				{sortedArray.map(review => (
					<ReviewFull key={review._id} review={review} />
				))}
			</div>
		</>
	)
}

export default ReviewsMainComponent
