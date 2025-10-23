import { useAppSelector } from '../../../redux/store'
import Login from './Login'
import NotLogin from './NotLogin'

const AccountMain = () => {
	const { userData } = useAppSelector(state => state.authSlice)

	return userData ? <Login userData={userData} /> : <NotLogin />
}

export default AccountMain
