import { useState } from 'react'
import { Outlet } from 'react-router'
import CloseIcon from '../assets/icons/close-icon.svg'
import SidebarIcon from '../assets/icons/sidebarIcon.svg'
import Sidebar from '../components/SidebarComponents/Sidebar'

const MainLayout = () => {
	const [sidebar, setSidebar] = useState(false)

	return (
		<div className='relative'>
			<div
				onClick={() => setSidebar(!sidebar)}
				className='fixed z-20 top-3 right-6 bg-links-and-borders rounded-md xl:hidden'
			>
				<img
					className='w-10'
					src={sidebar ? CloseIcon : SidebarIcon}
					alt='sidebar-icon'
				/>
			</div>

			<Sidebar sidebar={sidebar} />

			<div className='ml-85 py-6 pr-6 max-xl:ml-6 xl:pb-0'>
				<Outlet />
			</div>
		</div>
	)
}

export default MainLayout
