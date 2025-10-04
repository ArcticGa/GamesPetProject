import { IReview } from '../../types/types'
import { useGetDate } from '../../utils/hooks/getDate'

import { Link } from 'react-router'
import UserAvatar from '../../assets/GameImages/Minimita.jpg'
import HeartIcon from '../../assets/icons/heart.svg'
import RedHeartIcon from '../../assets/icons/redHeart.svg'
import DislikeIcon from '../../assets/icons/thumbs-down.svg'
import LikeIcon from '../../assets/icons/thumbs-up.svg'
import { useAppSelector } from '../../redux/store'

const ReviewFull = ({ review }: { review: IReview }) => {
	const { userData } = useAppSelector(state => state.authSlice)

	const date = new Date(review.createdAt)
	const published = useGetDate(date.getTime())

	return (
		<div className='flex flex-col p-4 bg-main-blocks rounded-2xl max-w-[480px]'>
			<div className='flex items-center justify-between rounded-2xl bg-main-background shadow-lg px-6 py-3 mb-4'>
				<div className='flex items-center'>
					<img
						className='mr-2 w-12 rounded-full'
						src={UserAvatar}
						alt='user-avatar'
					/>
					<div>
						<div className='font-bold text-lg'>{review.user.nickname}</div>
						<div className='text-xs text-[#c5c5c5]'>
							Обзоров: {review.user.ownReviews.length}
						</div>
					</div>
				</div>
				<div className='flex items-center bg-main-blocks text-sm px-4 py-2 rounded-xl'>
					<img
						src={review.isRecommended ? RedHeartIcon : HeartIcon}
						alt='heart-icon'
					/>
					<div className='ml-2'>
						{review.isRecommended ? 'Рекомендую' : 'Не рекомендую'}
					</div>
				</div>
				<div className='flex flex-col items-center'>
					<div className='text-bold text-3xl'>{review.grade}</div>
					<div className='text-xs text-[#c5c5c5]'>Оценка</div>
				</div>
			</div>
			<div className='flex-1 mx-6 mb-5 max-h-[150px] text-sm overflow-auto scrollbar mr-2'>
				{review.text}
			</div>
			<div className='text-end mx-6 mb-2 text-[#c7c7c7] text-sm'>
				Был ли обзор полезен
			</div>
			<div className='flex items-center justify-between mx-6'>
				<div className='text-xs'>
					<div>Опубликовано</div>
					<div>{published}</div>
				</div>
				{userData ? (
					userData._id !== review.user._id ? (
						<div className='flex'>
							<div className='flex items-center bg-main-background rounded-lg px-4 py-1.5 mr-1'>
								<img className='w-5' src={LikeIcon} alt='like-icon' />
								<div className='ml-2 text-sm'>Да ({review.likes})</div>
							</div>
							<div className='flex items-center bg-main-background rounded-lg px-4 py-1.5'>
								<img className='w-5' src={DislikeIcon} alt='dislike-icon' />
								<div className='ml-2 text-sm'>Нет ({review.dislikes})</div>
							</div>
						</div>
					) : (
						<div className='text-xs text-gray-500 max-w-[60%] text-right'>
							Вы не можете оценить свой обзор
						</div>
					)
				) : (
					<Link
						to={'/auth'}
						className='text-xs text-links-and-borders max-w-[40%] text-right'
					>
						Авторизуйтесь, чтобы поставить оценку
					</Link>
				)}
			</div>
		</div>
	)
}

export default ReviewFull
