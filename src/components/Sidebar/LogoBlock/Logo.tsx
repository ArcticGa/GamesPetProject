import { useState } from 'react'
import { Link } from 'react-router'
import HelpIcon from '../../../assets/icons/help-circle.svg'
import LogoIcon from '../../../assets/icons/logo.png'
import InfoBlock from './InfoBlock'

const Logo = () => {
	const [openInfo, setOpenInfo] = useState(false)

	return (
		<div className='flex justify-between items-center mb-6 relative'>
			<img className='w-10' src={LogoIcon} alt='search-icon' />

			<Link to={'/'} className='font-bold text-2xl'>
				GamesWorld
			</Link>
			<div className='cursor-pointer' onClick={() => setOpenInfo(!openInfo)}>
				<img className='pb-1' src={HelpIcon} alt='help-icon' />
			</div>

			{openInfo && <InfoBlock setOpenInfo={setOpenInfo} />}
		</div>
	)
}

export default Logo
