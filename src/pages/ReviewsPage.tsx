import { useEffect } from 'react'
import { useParams } from 'react-router'
import ReviewsMainComponent from '../components/ReviewsPage/ReviewsMainComponent'
import { fetchReviews } from '../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'

const ReviewsPage = () => {
	const dispatch = useAppDispatch()
	const { reviews, status } = useAppSelector(state => state.gameReviewsSlice)
	const { id } = useParams()

	useEffect(() => {
		if (id !== undefined) {
			dispatch(fetchReviews(id))
		}
	}, [id, dispatch])

	return status === 'loading' ? (
		<div>Загрузка</div>
	) : status === 'error' ? (
		<div className='w-full h-[900px] flex items-center justify-center text-2xl italic'>
			Обзоров нет
		</div>
	) : (
		<ReviewsMainComponent data={reviews} />
	)
}

export default ReviewsPage
