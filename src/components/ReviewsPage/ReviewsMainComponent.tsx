import HeartIcon from '../../assets/icons/heart.svg'
import UserAvatar from '../../assets/icons/logo.png'
import DislikeIcon from '../../assets/icons/thumbs-down.svg'
import LikeIcon from '../../assets/icons/thumbs-up.svg'
import { IReview } from '../../types/types'

const ReviewsMainComponent = ({ data }: { data: IReview[] }) => {
	return (
		<div className='m-10'>
			<div className='text-2xl font-bold mb-8'>Обзоры пользователей</div>
			<div className='mb-8'>aboba</div>
			<div className='flex justify-between'>
				<div className='flex bg-main-blocks p-4 rounded-2xl'>
					<div className='flex flex-col items-center bg-main-background rounded-xl py-4 px-3 mr-8 shadow-lg'>
						<div className='flex flex-col items-center mb-12'>
							<img
								className='w-[55px] mb-2'
								src={UserAvatar}
								alt='user-avatar'
							/>
							<div className='text-lg font-bold'>monKe</div>
							<div className='text-xs text-[#c7c7c7] '>Обзоров: 3</div>
						</div>
						<div className='flex flex-col items-center mb-12'>
							<div className='text-[#c7c7c7] text-sm mb-2'>Оценка</div>
							<div className='text-4xl font-bold'>9.1</div>
						</div>
						<div className='flex flex-col items-center text-xs'>
							<div className='mb-1 text-[#c7c7c7]'>Опубликовано:</div>
							<div>28 февраля 2023</div>
						</div>
					</div>
					<div className='flex flex-col justify-between'>
						<div className='flex-1 max-w-[520px] max-h-[250px] overflow-y-auto scrollbar'>
							Despite its uninteresting story and occasional jankiness,
							Ghostrunner 2 still manages to be a great successor by
							understanding why the first game was such a success, sharpening
							nearly every mechanic, and building upon them with the addition of
							the bike and wingsuit. It might not be the most innovative sequel
							in the world, but considering how great the original Ghostrunner
							already was, that’s no bad thing. Despite its uninteresting story
							and occasional jankiness, Ghostrunner 2 still manages to be a
							great successor by understanding why the first game was such a
							success. Despite its uninteresting story and occasional jankiness,
							Ghostrunner 2 still manages to be a great successor by
							understanding why the first game was such a success, sharpening
							nearly every mechanic, and building upon them with the addition.
						</div>
						<hr />
						<div className='justify-self-end flex items-end justify-between'>
							<div className='flex items-center bg-reviews p-3 rounded-xl'>
								<img className='w-6' src={HeartIcon} alt='heart-icon' />
								<span className='ml-2 '>Не рекомендую</span>
							</div>
							<div>
								<div className='text-xs text-[#c7c7c7] mb-2 text-end'>
									Понравился обзор?
								</div>
								<div className='flex'>
									<div className='flex items-center bg-reviews py-1 px-5 rounded-lg mr-3'>
										<img src={LikeIcon} alt='like-icon' />
										<div className='ml-2'>Да (2)</div>
									</div>
									<div className='flex items-center bg-reviews py-1 px-5 rounded-lg'>
										<img src={DislikeIcon} alt='dislike-icon' />
										<div className='ml-2'>Нет (4)</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='flex bg-main-blocks p-4 rounded-2xl'>
					<div className='flex flex-col items-center bg-main-background rounded-xl py-4 px-3 mr-8 shadow-lg'>
						<div className='flex flex-col items-center mb-12'>
							<img
								className='w-[55px] mb-2'
								src={UserAvatar}
								alt='user-avatar'
							/>
							<div className='text-lg font-bold'>monKe</div>
							<div className='text-xs text-[#c7c7c7] '>Обзоров: 3</div>
						</div>
						<div className='flex flex-col items-center mb-12'>
							<div className='text-[#c7c7c7] text-sm mb-2'>Оценка</div>
							<div className='text-4xl font-bold'>9.1</div>
						</div>
						<div className='flex flex-col items-center text-xs'>
							<div className='mb-1 text-[#c7c7c7]'>Опубликовано:</div>
							<div>28 февраля 2023</div>
						</div>
					</div>
					<div className='flex flex-col justify-between'>
						<div className='flex-1 max-w-[520px] max-h-[250px] overflow-y-auto scrollbar'>
							Despite its uninteresting story and occasional jankiness,
							Ghostrunner 2 still manages to be a great successor by
							understanding why the first game was such a success, sharpening
							nearly every mechanic, and building upon them with the addition of
							the bike and wingsuit. It might not be the most innovative sequel
							in the world, but considering how great the original Ghostrunner
							already was, that’s no bad thing. Despite its uninteresting story
							and occasional jankiness, Ghostrunner 2 still manages to be a
							great successor by understanding why the first game was such a
							success. Despite its uninteresting story and occasional jankiness,
							Ghostrunner 2 still manages to be a great successor by
							understanding why the first game was such a success, sharpening
							nearly every mechanic, and building upon them with the addition.
						</div>
						<hr />
						<div className='justify-self-end flex items-end justify-between'>
							<div className='flex items-center bg-reviews p-3 rounded-xl'>
								<img className='w-6' src={HeartIcon} alt='heart-icon' />
								<span className='ml-2 '>Не рекомендую</span>
							</div>
							<div>
								<div className='text-xs text-[#c7c7c7] mb-2 text-end'>
									Понравился обзор?
								</div>
								<div className='flex'>
									<div className='flex items-center bg-reviews py-1 px-5 rounded-lg mr-3'>
										<img src={LikeIcon} alt='like-icon' />
										<div className='ml-2'>Да (2)</div>
									</div>
									<div className='flex items-center bg-reviews py-1 px-5 rounded-lg'>
										<img src={DislikeIcon} alt='dislike-icon' />
										<div className='ml-2'>Нет (4)</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReviewsMainComponent
