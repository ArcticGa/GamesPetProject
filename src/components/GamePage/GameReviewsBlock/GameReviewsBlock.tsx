import { useEffect } from 'react'

import { Link } from 'react-router'
import { fetchGameReviews } from '../../../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { IFullGame } from '../../../types/types'
import ReviewFull from '../../ReviewsPage/ReviewFull'

const GameReviewsBlock = ({ game }: { game: IFullGame }) => {
	const dispatch = useAppDispatch()
	const { reviews } = useAppSelector(state => state.gameReviewsSlice)

	useEffect(() => {
		dispatch(fetchGameReviews(game.id))
	}, [game, dispatch])

	return (
		<div className='mb-14'>
			<div className='flex justify-between mb-4'>
				<div className='text-xl'>{game?.title}: Обзоры пользователей</div>
				<Link
					to={`/game/${game?.id}/reviews`}
					className='text-xl text-links-and-borders border-main-background border-b-1 hover:border-links-and-borders'
				>
					Все обзоры...
				</Link>
			</div>
			<div className={`flex ${reviews.length === 0 && 'justify-center'}`}>
				{reviews.length === 0 ? (
					<div className='text-xl mt-14 italic text-center '>
						<div>Обзоров пока нет. Будьте первыми </div>
						<div>( Все обзоры... → Добавить обзор )</div>
					</div>
				) : (
					reviews
						.slice(0, 3)
						.map((review, index) => <ReviewFull key={index} review={review} />)
				)}
			</div>
		</div>
	)
}

export default GameReviewsBlock
