import { Link } from 'react-router'
import UserAvatar from '../../../assets/GameImages/Minimita.jpg'
import HeartIcon from '../../../assets/icons/heart.svg'
import RedHeartIcon from '../../../assets/icons/redHeart.svg'
import { useAppSelector } from '../../../redux/store'
import { IReview } from '../../../types/types'
import { useGetDate } from '../../../utils/hooks/getDate'
import VoteBtns from './VoteBtns'

const Review = ({ data }: { data: IReview }) => {
	const { userData } = useAppSelector(state => state.authSlice)

	const date = new Date(data.createdAt)
	const published = useGetDate(date.getTime())

	return (
		<div className='flex flex-col w-[470px] p-4 bg-main-blocks rounded-2xl text-sm mr-6 mb-6'>
			<div className='flex justify-between items-center'>
				<Link to={`/user/${data.user._id}`} className='flex items-center'>
					<div className='mr-2'>
						<img
							className='w-12 rounded-full'
							src={UserAvatar}
							alt='user-avatar'
						/>
					</div>
					<div>
						<div className='text-lg'>{data.user.nickname}</div>
						<div className=' text-gray-400'>
							Обзоров: {data.user.ownReviews.length}
						</div>
					</div>
				</Link>
				<div className='flex flex-col items-center'>
					<div className='text-3xl'>{data.grade}</div>
					<div className='text-xs text-gray-400'>оценка</div>
				</div>
				<div
					className={`flex items-center ${
						data.isRecommended ? 'bg-links-and-borders' : 'bg-reviews'
					}  p-3 rounded-xl`}
				>
					<img
						className='w-6'
						src={data.isRecommended ? RedHeartIcon : HeartIcon}
						alt='heart-icon'
					/>
					<span className='ml-2 '>
						{data.isRecommended ? 'Рекомендую' : 'Не рекомендую'}
					</span>
				</div>
			</div>
			<hr className='my-4' />
			<div className='flex-1'>
				<div className='mb-4 text-gray-400'>Опубликовано: {published}</div>
				<div className='max-h-[150px] overflow-auto scrollbar'>{data.text}</div>
			</div>
			<div className='mt-4 mb-2 text-gray-400'>Понравился обзор?</div>
			{userData ? (
				userData._id !== data.user._id ? (
					<VoteBtns data={data} />
				) : (
					<div className='flex items-center justify-between text-sm text-gray-500'>
						<div>Вы не можете оценить свой обзор</div>
						<div>
							{data.likes} / {data.dislikes}
						</div>
					</div>
				)
			) : (
				<div>Авторизуйтесь чтобы поставить оценку</div>
			)}
		</div>
	)
}

export default Review
