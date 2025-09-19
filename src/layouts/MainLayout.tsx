import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar/SidebarBlock/Sidebar'
import { useAppSelector } from '../redux/store'

const MainLayout = () => {
	const { sidebarStatus } = useAppSelector(state => state.hideSidebarSlice)

	return (
		<>
			<Sidebar />
			<div
				className={`${sidebarStatus === true ? `ml-85` : `ml-32`} pt-6 pr-6`}
			>
				<Outlet />
			</div>
		</>
	)
}

export default MainLayout
