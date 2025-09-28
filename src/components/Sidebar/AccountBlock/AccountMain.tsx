import { useAppSelector } from '../../../redux/store'
import Login from './Login'
import NotLogin from './NotLogin'

const AccountMain = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	const { userData } = useAppSelector(state => state.authSlice)

	return userData ? (
		<Login sidebarStatus={sidebarStatus} userData={userData} />
	) : (
		<NotLogin sidebarStatus={sidebarStatus} />
	)
}

export default AccountMain
