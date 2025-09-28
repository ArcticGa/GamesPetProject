import { useState } from 'react'
import AccountMenuIcon from '../../../assets/icons/account-menu.svg'
import LogoutIcon from '../../../assets/icons/log-out.svg'
import UserAvatar from '../../../assets/icons/logo.png'

import { logout } from '../../../redux/slices/auth'
import { useAppDispatch } from '../../../redux/store'
import { IUser } from '../../../types/types'
import { arrayAccountItems } from '../../../utils/miniArrays'
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
				<div className='mb-8 px-3 rounded-xl border-5 border-main-blocks bg-main-background w-60 absolute -bottom-9 left-70'>
					{arrayAccountItems.map(item => (
						<div
							key={item._id}
							className='flex my-5 items-center cursor-pointer'
						>
							<img className='w-6' src={item.image} alt={item.title} />
							{sidebarStatus && (
								<div className='ml-2 leading-4'>{item.title}</div>
							)}
						</div>
					))}

					<div
						onClick={logoutHandler}
						className='flex items-center justify-between p-2 bg-main-blocks rounded-xl mb-2.5 cursor-pointer'
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
					<img className='w-8' src={UserAvatar} alt='user-avatar' />
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
