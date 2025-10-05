import ReviewsMainComponent from '../components/ReviewsPage/ReviewsMainComponent'

const ReviewsPage = () => {
	return (
		<div className='m-10'>
			<div className='text-2xl font-bold mb-8'>Обзоры пользователей</div>
			<div className='mb-4 text-lg'>Сортировка</div>
			<ReviewsMainComponent />
		</div>
	)
}

export default ReviewsPage
