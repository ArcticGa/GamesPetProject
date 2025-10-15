import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar/Sidebar'

const MainLayout = () => {
	return (
		<>
			<Sidebar />
			<div className='ml-85 pt-6 pr-6'>
				<Outlet />
			</div>
		</>
	)
}

export default MainLayout
