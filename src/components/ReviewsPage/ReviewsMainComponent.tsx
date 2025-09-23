import { IReview } from '../../types/types'

const ReviewsMainComponent = ({ data }: { data: IReview[] }) => {
	return (
		<div className='m-10'>
			<div>Обзоры пользователей</div>
			<div>{/* Тут будет сортировка (компоненты) */}</div>
			<div>{/* Тут будет список обзоров */}</div>
		</div>
	)
}

export default ReviewsMainComponent
