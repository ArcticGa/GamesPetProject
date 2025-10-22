import { IFullGame, IReview } from '../../../types/types'
import ReviewFull from '../../ReviewsPage/ReviewFull'
import GameBlock from './GameBlock'

const RenderInfoBlock = ({
	array,
	arrayType,
	isOwn,
}: {
	array: IReview[] | IFullGame[]
	arrayType: 'games' | 'ownReviews' | 'likedReviews'
	isOwn: boolean
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
					? 'flex items-center flex-wrap mx-20 max-sm:m-0'
					: 'flex justify-center flex-wrap'
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
									isOwn={isOwn}
								/>
							)
					)
				) : arrayType === 'likedReviews' ? (
					array.map(
						review =>
							review && (
								<ReviewFull
									key={(review as IReview)._id}
									review={review as IReview}
								/>
							)
					)
				) : (
					arrayType === 'ownReviews' &&
					array.length !== 0 &&
					array.map(review => (
						<ReviewFull
							key={(review as IReview)._id}
							review={review as IReview}
						/>
					))
				)
			) : (
				<div className='w-full text-center text-xl'>
					{arrayType === 'games' && <span>Избранных игр пока нет</span>}
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
