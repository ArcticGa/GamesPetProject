import { useAppSelector } from '../../../redux/store'
import Login from './Login'
import NotLogin from './NotLogin'

const AccountMain = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	const { loginStatus } = useAppSelector(state => state.loginAccountSlice)

	return loginStatus ? (
		<Login sidebarStatus={sidebarStatus} />
	) : (
		<NotLogin sidebarStatus={sidebarStatus} />
	)
}

export default AccountMain
