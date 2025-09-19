import HeartIcon from '../../../assets/icons/heart.svg'
import UserAvatar from '../../../assets/icons/logo.png'
import DislikeIcon from '../../../assets/icons/thumbs-down.svg'
import LikeIcon from '../../../assets/icons/thumbs-up.svg'
import { useAppSelector } from '../../../redux/store'

const GameReviewsBlock = () => {
	const { game } = useAppSelector(state => state.gameByIdSlice)

	return (
		<div>
			<div className='flex justify-between mb-4'>
				<div className='text-xl'>{game?.title}: Обзоры пользователей</div>
				<div className='text-xl text-links-and-borders'>Все обзоры...</div>
			</div>

			<div className='flex items-start'>
				<div className='max-w-[550px] p-6 bg-main-blocks rounded-2xl mr-6'>
					<div className='flex justify-between items-center'>
						<div className='flex items-center'>
							<div className='mr-2'>
								<img src={UserAvatar} alt='user-avatar' />
							</div>
							<div>
								<div className='text-lg'>monKe</div>
								<div className='text-sm text-gray-400'>Обзоров: 37</div>
							</div>
						</div>
						<div className='text-2xl'>8.6</div>
						<div className='flex items-center bg-reviews p-3 rounded-xl'>
							<img src={HeartIcon} alt='heart-icon' />
							<span className='ml-2 '>Не рекомендую</span>
						</div>
					</div>
					<hr className='my-4' />
					<div className='mb-4 text-gray-400'>Опубликовано: 20 января 2025</div>
					<div>
						Despite its uninteresting story and occasional jankiness,
						Ghostrunner 2
					</div>
					<div className='mt-4 mb-2 text-gray-400'>Понравился обзор?</div>
					<div className='flex items-center'>
						<div className='flex items-center bg-reviews py-1.5 px-4 rounded-xl mr-4'>
							<img src={LikeIcon} alt='like-icon' />
							<div className='ml-2'>Да (12)</div>
						</div>
						<div className='flex items-center bg-reviews py-1.5 px-4 rounded-xl'>
							<img src={DislikeIcon} alt='dislike-icon' />
							<div className='ml-2'>Нет (3)</div>
						</div>
					</div>
				</div>
				<div className='max-w-[550px] p-6 bg-main-blocks rounded-2xl'>
					<div className='flex justify-between items-center'>
						<div className='flex items-center'>
							<div className='mr-2'>
								<img src={UserAvatar} alt='user-avatar' />
							</div>
							<div>
								<div className='text-lg'>monKe</div>
								<div className='text-sm text-gray-400'>Обзоров: 37</div>
							</div>
						</div>
						<div className='text-2xl'>8.6</div>
						<div className='flex items-center bg-reviews p-3 rounded-xl'>
							<img src={HeartIcon} alt='heart-icon' />
							<span className='ml-2 '>Не рекомендую</span>
						</div>
					</div>
					<hr className='my-4' />
					<div className='mb-4 text-gray-400'>Опубликовано: 20 января 2025</div>
					<div>
						Despite its uninteresting story and occasional jankiness,
						Ghostrunner 2 still manages to be a great successor by understanding
						why the first game was such a success, sharpening nearly every
						mechanic, and building upon them with the addition of the bike and
						wingsuit.
					</div>
					<div className='mt-4 mb-2 text-gray-400'>Понравился обзор?</div>
					<div className='flex items-center'>
						<div className='flex items-center bg-reviews py-1.5 px-4 rounded-xl mr-4'>
							<img src={LikeIcon} alt='like-icon' />
							<div className='ml-2'>Да (12)</div>
						</div>
						<div className='flex items-center bg-reviews py-1.5 px-4 rounded-xl'>
							<img src={DislikeIcon} alt='dislike-icon' />
							<div className='ml-2'>Нет (3)</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameReviewsBlock
