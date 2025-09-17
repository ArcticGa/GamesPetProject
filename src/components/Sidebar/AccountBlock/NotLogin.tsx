import UserIcon from '../../../assets/icons/user.svg'

const NotLogin = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	return (
		<div className='flex items-center justify-between p-3 bg-main-background rounded-2xl cursor-pointer'>
			{sidebarStatus && <div>Войти</div>}
			<img src={UserIcon} alt='user-icon' />
		</div>
	)
}

export default NotLogin
