import { Link } from 'react-router'
import UserIcon from '../../../assets/icons/user.svg'

const NotLogin = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	return (
		<Link
			to={'/auth'}
			className='flex items-center justify-between p-3 bg-main-background rounded-2xl'
		>
			{sidebarStatus && <div>Войти</div>}
			<img src={UserIcon} alt='user-icon' />
		</Link>
	)
}

export default NotLogin
