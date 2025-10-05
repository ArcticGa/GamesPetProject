import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchGameReviews } from '../../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { sortParamsArr } from '../../utils/miniArrays'
import ReviewFull from './ReviewFull'
import SortBlock from './SortBlock'
import { sortReviewsArray } from './Utils'

const ReviewsMainComponent = () => {
	const dispatch = useAppDispatch()
	const { reviews } = useAppSelector(state => state.gameReviewsSlice)
	const { id } = useParams()

	const [activeSortItem, setActiveSortItem] = useState(0)
	const [sortedArray, setSortedArray] = useState(reviews)

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
				<div>Написать обзор</div>
			</div>
			<div className='grid grid-cols-3 gap-6'>
				{sortedArray.map(review => (
					<ReviewFull key={review._id} review={review} />
				))}
			</div>
		</>
	)
}

export default ReviewsMainComponent
