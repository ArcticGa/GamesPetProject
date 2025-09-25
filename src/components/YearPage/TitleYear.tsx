import { SetStateAction } from 'react'
import ArrowIcon from '../../assets/icons/arrow-down.svg'
import CrownIcon from '../../assets/icons/crown-icon.svg'
import InfoIcon from '../../assets/icons/help-circle.svg'

const TitleYear = ({
	setYear,
}: {
	setYear: React.Dispatch<SetStateAction<number>>
}) => {
	return (
		<div className='flex items-center justify-between mb-12'>
			<div className='flex items-center'>
				<div className='text-2xl font-bold mr-2'>Игры года</div>
				<img src={InfoIcon} alt='info-icon' />
				<div className='px-2.5 py-2.5 bg-main-blocks rounded-xl ml-2 text-xs max-w-[200px]'>
					Вся информация взята с источника «Steam Awards»
				</div>
			</div>
			<div className='relative flex items-center justify-between w-[250px] rounded-2xl bg-game-year-button px-4 py-3 cursor-pointer'>
				<div className='text-2xl font-bold leading-0'>2024</div>
				<img
					className='absolute w-18 bottom-1 rotate-25 left-20'
					src={CrownIcon}
					alt='crown-icon'
				/>
				<img
					className='absolute w-18 left-35 -rotate-25 top-1'
					src={CrownIcon}
					alt='crown-icon'
				/>
				<img src={ArrowIcon} alt='arrow-icon' />
			</div>
		</div>
	)
}

export default TitleYear
