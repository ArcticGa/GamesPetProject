import { useState } from 'react'
import BoochiGif from '../../../../assets/GameImages/ani.gif'
import FrirenGif from '../../../../assets/GameImages/friren.gif'
import { IUser } from '../../../../types/types'
import Avatar from './Avatar'
import InfoUserBlock from './InfoUserBlock'
import Nickname from './Nickname'

const MainProfileBlock = ({
	userData,
	isOwn,
}: {
	userData: IUser
	isOwn: boolean
}) => {
	const [isChangeNickname, setIsChangeNickname] = useState(false)

	return (
		<div className='bg-main-blocks py-4 px-15 rounded-2xl mb-8 max-sm:px-4'>
			<div className='flex items-center justify-between max-2xl:flex-col'>
				<Avatar isOwn={isOwn} userData={userData} />
				<Nickname
					isOwn={isOwn}
					userData={userData}
					isChangeNickname={isChangeNickname}
					setIsChangeNickname={setIsChangeNickname}
				/>
				<InfoUserBlock isOwn={isOwn} userData={userData} />

				{isChangeNickname ? (
					<img className='w-42 max-2xl:hidden' src={BoochiGif} alt='gif' />
				) : (
					<img
						className={`${isOwn ? 'w-45' : 'w-41'} max-2xl:hidden`}
						src={isOwn ? FrirenGif : BoochiGif}
						alt='gif'
					/>
				)}
			</div>
		</div>
	)
}

export default MainProfileBlock
