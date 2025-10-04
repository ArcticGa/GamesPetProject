import { useState } from 'react'
import UserAvatar from '../../../assets/GameImages/Minimita.jpg'
import AccountMenuIcon from '../../../assets/icons/account-menu.svg'
import LogoutIcon from '../../../assets/icons/log-out.svg'
import WriteDevIcon from '../../../assets/icons/message-developer.svg'
import UserIcon from '../../../assets/icons/user.svg'

import { Link } from 'react-router'
import { logout } from '../../../redux/slices/auth'
import { useAppDispatch } from '../../../redux/store'
import { IUser } from '../../../types/types'
import { stylesLogin } from './Utils'

const Login = ({
	sidebarStatus,
	userData,
}: {
	sidebarStatus: boolean
	userData: IUser
}) => {
	const dispatch = useAppDispatch()

	const [openBtns, setOpenBtns] = useState(false)

	const openAccount = () => {
		setOpenBtns(!openBtns)
	}

	const logoutHandler = () => {
		dispatch(logout())
		localStorage.removeItem('token')
	}

	return (
		<div className={stylesLogin(sidebarStatus)}>
			{openBtns && sidebarStatus && (
				<div className='mb-8 p-3 rounded-xl bg-main-blocks w-60 absolute -bottom-9 left-70'>
					<div className='flex p-3 mb-2.5 rounded-xl bg-main-background items-center cursor-pointer'>
						{sidebarStatus && (
							<div className='leading-4'>Написать разработчику</div>
						)}
						<img className='w-6' src={WriteDevIcon} alt='text-icon' />
					</div>

					<Link
						to={`/profile`}
						onClick={() => setOpenBtns(false)}
						className='flex items-center justify-between bg-main-background rounded-xl mb-8 px-3 py-3'
					>
						<div>Профиль</div>
						<img src={UserIcon} alt='user-icon' />
					</Link>

					<div
						onClick={logoutHandler}
						className='flex items-center justify-between py-2 px-3 bg-[#94070a] rounded-xl  cursor-pointer'
					>
						<div>Выйти</div>
						<img src={LogoutIcon} alt='logout-icon' />
					</div>
				</div>
			)}

			<div
				onClick={() => openAccount()}
				className='flex items-center justify-between cursor-pointer'
			>
				<div className='flex items-center'>
					<img
						className='w-8 rounded-full'
						src={UserAvatar}
						alt='user-avatar'
					/>
					{sidebarStatus && (
						<span className='ml-2 text-xl'>{userData.nickname}</span>
					)}
				</div>
				{sidebarStatus && (
					<img className='w-5' src={AccountMenuIcon} alt='logout-icon' />
				)}
			</div>
		</div>
	)
}

export default Login
