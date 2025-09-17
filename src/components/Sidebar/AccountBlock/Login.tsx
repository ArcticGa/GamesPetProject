import { useState } from 'react'
import AccountMenuIcon from '../../../assets/icons/account-menu.svg'
import UserAvatar from '../../../assets/icons/logo.png'

import { arrayAccountItems } from '../../../utils/MiniArrays'
import { stylesLogin } from './Utils'

const Login = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	const [openBtns, setOpenBtns] = useState(false)

	const openAccount = () => {
		setOpenBtns(!openBtns)
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
				</div>
			)}

			<div
				onClick={() => openAccount()}
				className='flex items-center justify-between cursor-pointer'
			>
				<div className='flex items-center'>
					<img className='w-8' src={UserAvatar} alt='user-avatar' />
					{sidebarStatus && <span className='ml-2 text-xl'>monKe</span>}
				</div>
				{sidebarStatus && (
					<img className='w-5' src={AccountMenuIcon} alt='logout-icon' />
				)}
			</div>
		</div>
	)
}

export default Login
