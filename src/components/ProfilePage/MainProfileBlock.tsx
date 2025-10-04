import FrirenGif from '../../assets/GameImages/friren.gif'
import UserAvatar from '../../assets/GameImages/Minimita.jpg'
import { IUser } from '../../types/types'
import InfoDiv from './InfoDiv'

const MainProfileBlock = ({ userData }: { userData: IUser }) => {
	return (
		<div className='mb-8'>
			<div className='flex flex-col bg-main-blocks py-4 px-15 rounded-t-2xl'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<img
							className='w-40 mr-4 rounded-full'
							src={UserAvatar}
							alt='userAvatar'
						/>
						<div className='mr-15'>
							<InfoDiv text={'Никнейм:'}>{userData.nickname}</InfoDiv>
							<InfoDiv text={'Избранных игр:'}>
								{userData.featuredGames.length}
							</InfoDiv>
							<InfoDiv text={'Пользователь на сайте с'}>
								{userData.createdAt.slice(0, 10)}
							</InfoDiv>
						</div>
						<div>
							<InfoDiv text={'Созданных обзоров:'}>
								{userData.ownReviews.length}
							</InfoDiv>
							<InfoDiv text={'Понравившихся обзоров:'}>
								{userData.likedReviews.length}
							</InfoDiv>
							<InfoDiv text={'Непонравившихся обзоров:'}>
								{userData.dislikedReviews.length}
							</InfoDiv>
						</div>
					</div>
					<img className='w-45' src={FrirenGif} alt='friren-gif' />
				</div>
			</div>
			<div className='py-2.5 rounded-t-none border-3 cursor-pointer transition-colors duration-200 hover:bg-links-and-borders hover:border-links-and-borders border-main-blocks rounded-lg text-center'>
				Редактировать профиль
			</div>
		</div>
	)
}

export default MainProfileBlock
