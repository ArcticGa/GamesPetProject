import { IFullGame, IReview } from '../../types/types'
import Review from '../GamePage/GameReviewsBlock/Review'
import GameBlock from './GameBlock'

const RenderInfoBlock = ({
	array,
	arrayType,
}: {
	array: IReview[] | IFullGame[]
	arrayType: 'games' | 'ownReviews' | 'likedReviews'
}) => {
	const allEqual = (arr: IReview[] | IFullGame[]) => {
		return arr.every(item => {
			return item === arr[0] && item === undefined
		})
	}

	return (
		<div
			className={`${
				arrayType === 'games'
					? 'flex items-center flex-wrap mx-20 '
					: 'flex items-center justify-center flex-wrap'
			} `}
		>
			{!allEqual(array) ? (
				arrayType === 'games' ? (
					array.map(
						game =>
							game && (
								<GameBlock
									key={(game as IFullGame).id}
									game={game as IFullGame}
								/>
							)
					)
				) : arrayType === 'likedReviews' ? (
					array.map(
						review =>
							review && (
								<Review
									key={(review as IReview)._id}
									data={review as IReview}
								/>
							)
					)
				) : (
					arrayType === 'ownReviews' &&
					array.length !== 0 &&
					array.map(review => (
						<Review key={(review as IReview)._id} data={review as IReview} />
					))
				)
			) : (
				<div className='w-full text-center text-xl'>
					{arrayType === 'games' && <span>Игр пока нет</span>}
					{arrayType === 'ownReviews' && (
						<span>Созданных обзоров пока нет</span>
					)}
					{arrayType === 'likedReviews' && (
						<span>Понравившихся обзоров пока нет</span>
					)}
				</div>
			)}
		</div>
	)
}

export default RenderInfoBlock
