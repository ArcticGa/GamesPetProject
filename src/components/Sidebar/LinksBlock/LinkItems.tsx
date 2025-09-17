import { Link } from 'react-router'

import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { linksArray } from '../../../utils/miniArrays'
import { changePage, stylesBlockHandler } from './Utils'

const LinkItems = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	const dispatch = useAppDispatch()
	const { activeLink } = useAppSelector(state => state.linksSlice)

	return linksArray.map((link, index) => (
		<Link
			key={index}
			onClick={() => changePage(index, activeLink, dispatch)}
			to={`/${link.path}`}
			className={stylesBlockHandler(activeLink, index, sidebarStatus)}
		>
			<img src={link.icon} alt={link.name} />
			{sidebarStatus && <span className='ml-2 pt-1'>{link.name}</span>}

			{activeLink === index && (
				<div>
					{link.bgImage && (
						<img
							className='absolute -top-6 left-35 w-28 rotate-30'
							src={link.bgImage}
						/>
					)}
				</div>
			)}
		</Link>
	))
}

export default LinkItems
