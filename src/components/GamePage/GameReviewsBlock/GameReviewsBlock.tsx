import { useEffect } from 'react'

import { Link } from 'react-router'
import { fetchReviews } from '../../../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import Review from './Review'

const GameReviewsBlock = () => {
	const dispatch = useAppDispatch()
	const { game } = useAppSelector(state => state.gameByIdSlice)
	const { reviews, status } = useAppSelector(state => state.gameReviewsSlice)

	useEffect(() => {
		if (game) {
			dispatch(fetchReviews(game.id))
		}
	}, [game, dispatch])

	return (
		<div className='mb-14'>
			<div className='flex justify-between mb-4'>
				<div className='text-xl'>{game?.title}: Обзоры пользователей</div>
				{reviews.length > 0 && (
					<Link
						to={`/game/${game?.id}/reviews`}
						className='text-xl text-links-and-borders'
					>
						Все обзоры...
					</Link>
				)}
			</div>
			<div className='flex justify-center'>
				{status === 'error' ? (
					<div className='text-xl mt-14 italic'>
						Обзоров пока нет. Будьте первыми (Тут типа кнопка Добавить Обзор)
					</div>
				) : (
					status === 'success' &&
					reviews
						.slice(0, 3)
						.map((review, index) => <Review key={index} data={review} />)
				)}
			</div>
		</div>
	)
}

export default GameReviewsBlock
