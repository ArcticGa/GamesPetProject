import { useEffect, useState } from 'react'
import { IReview } from '../../types/types'
import { sortParamsArr } from '../../utils/miniArrays'
import ReviewFull from './ReviewFull'
import SortBlock from './SortBlock'
import { sortReviewsArray } from './Utils'

const ReviewsMainComponent = ({ data }: { data: IReview[] }) => {
	const [activeSortItem, setActiveSortItem] = useState(0)
	const [sortedArray, setSortedArray] = useState(data)

	useEffect(() => {
		sortReviewsArray(activeSortItem, setSortedArray, data)
	}, [activeSortItem, data])

	return (
		<div className='m-10'>
			<div className='text-2xl font-bold mb-8'>Обзоры пользователей</div>
			<div className='mb-4 text-lg'>Сортировка</div>
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
		</div>
	)
}

export default ReviewsMainComponent
