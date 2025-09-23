import HeartIcon from '../../../assets/icons/heart.svg'
import UserAvatar from '../../../assets/icons/logo.png'
import RedHeartIcon from '../../../assets/icons/redHeart.svg'
import DislikeIcon from '../../../assets/icons/thumbs-down.svg'
import LikeIcon from '../../../assets/icons/thumbs-up.svg'
import { IReview } from '../../../types/types'
import { useGetDate } from '../../../utils/hooks/getDate'

const Review = ({ data }: { data: IReview }) => {
	const published = useGetDate(data.published_date)

	return (
		<div className='flex flex-col w-[470px] p-4 bg-main-blocks rounded-2xl text-sm mr-6'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center'>
					<div className='mr-2'>
						<img src={UserAvatar} alt='user-avatar' />
					</div>
					<div>
						<div className='text-lg'>monKe</div>
						<div className=' text-gray-400'>Обзоров: 37</div>
					</div>
				</div>
				<div className='text-xl'>{data.grade}</div>
				<div
					className={`flex items-center ${
						data.is_recommended ? 'bg-links-and-borders' : 'bg-reviews'
					}  p-3 rounded-xl`}
				>
					<img
						className='w-6'
						src={data.is_recommended ? RedHeartIcon : HeartIcon}
						alt='heart-icon'
					/>
					<span className='ml-2 '>
						{data.is_recommended ? 'Рекомендую' : 'Не рекомендую'}
					</span>
				</div>
			</div>
			<hr className='my-4' />
			<div className='flex-1'>
				<div className='mb-4 text-gray-400'>Опубликовано: {published}</div>
				<div className='max-h-[150px] overflow-auto scrollbar'>{data.text}</div>
			</div>
			<div className='mt-4 mb-2 text-gray-400'>Понравился обзор?</div>
			<div className='flex items-center'>
				<div className='flex items-center bg-reviews py-1.5 px-4 rounded-xl mr-4'>
					<img src={LikeIcon} alt='like-icon' />
					<div className='ml-2'>Да ({data.likes})</div>
				</div>
				<div className='flex items-center bg-reviews py-1.5 px-4 rounded-xl'>
					<img src={DislikeIcon} alt='dislike-icon' />
					<div className='ml-2'>Нет ({data.dislikes})</div>
				</div>
			</div>
		</div>
	)
}

export default Review
