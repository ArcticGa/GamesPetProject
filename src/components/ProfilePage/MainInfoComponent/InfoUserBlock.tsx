import { IUser } from '../../../types/types'
import InfoDiv from './InfoDiv'

type InfoUserProps = {
	isOwn: boolean
	userData: IUser
}

const InfoUserBlock = ({ isOwn, userData }: InfoUserProps) => {
	return (
		<>
			<div>
				<div className='text-center text-sm text-gray-400'>
					Общая информация
				</div>
				<div className='bg-main-background p-4 rounded-2xl shadow-lg mt-1'>
					{isOwn && <InfoDiv text={'Email:'}>{userData.email}</InfoDiv>}
					<InfoDiv text={'Избранных игр:'}>
						{userData.featuredGames.length}
					</InfoDiv>
					<InfoDiv text={'Пользователь на сайте с'}>
						{userData.createdAt.slice(0, 10)}
					</InfoDiv>
				</div>
			</div>
			<div>
				<div className='text-center text-sm text-gray-400'>
					Информация по обзорам
				</div>
				<div className='bg-main-background p-4 rounded-2xl shadow-lg mt-1'>
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
		</>
	)
}

export default InfoUserBlock
