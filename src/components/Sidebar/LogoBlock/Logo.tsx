import { useEffect, useState } from 'react'
import HelpIcon from '../../../assets/icons/help-circle.svg'
import LogoIcon from '../../../assets/icons/logo.png'
import InfoBlock from './InfoBlock'
import { stylesLogo } from './Utils'

const Logo = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	const [openInfo, setOpenInfo] = useState(false)

	useEffect(() => {
		if (!sidebarStatus) {
			setOpenInfo(false)
		}
	}, [sidebarStatus])

	return (
		<div className={stylesLogo(sidebarStatus)}>
			<img
				className={sidebarStatus ? 'w-12' : 'w-10'}
				src={LogoIcon}
				alt='search-icon'
			/>

			{sidebarStatus && (
				<>
					<span className='font-bold text-2xl'>GamesWorld</span>
					<div
						className='cursor-pointer'
						onClick={() => setOpenInfo(!openInfo)}
					>
						<img className='pb-1' src={HelpIcon} alt='help-icon' />
					</div>
				</>
			)}

			{openInfo && <InfoBlock />}
		</div>
	)
}

export default Logo
