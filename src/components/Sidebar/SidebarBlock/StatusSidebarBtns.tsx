import { FC } from 'react'
import { setSidebarStatus } from '../../../redux/slices/sidebarSlices/hideSidebarSlice'
import { useAppDispatch } from '../../../redux/store'
import { closeSidebarHandler } from './Utils'

interface ComponentProps {
	sidebarStatus: boolean
	activeSearch: boolean
}

const StatusSidebarBtns: FC<ComponentProps> = ({
	sidebarStatus,
	activeSearch,
}) => {
	const dispatch = useAppDispatch()

	return sidebarStatus ? (
		<div
			onClick={() => closeSidebarHandler(dispatch, activeSearch)}
			className='cursor-pointer absolute -bottom-4 left-0 w-full h-3 bg-main-blocks border-b-4 border-b-links-and-borders rounded-b-xs'
		></div>
	) : (
		<div
			className='cursor-pointer absolute w-full h-full top-0 left-0 z-50'
			onClick={() => dispatch(setSidebarStatus())}
		></div>
	)
}

export default StatusSidebarBtns
