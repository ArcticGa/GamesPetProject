import { SetStateAction, useState } from 'react'
import ArrowIcon from '../../../assets/icons/arrow-down.svg'
import CrownIcon from '../../../assets/icons/crown-icon.svg'
import InfoIcon from '../../../assets/icons/help-circle.svg'

const yearsArray = [2024, 2023]

const TitleYear = ({
	year,
	setYear,
}: {
	year: number
	setYear: React.Dispatch<SetStateAction<number>>
}) => {
	const [open, setOpen] = useState(false)

	const selectYearHandler = (year: number) => {
		setYear(year)
		setOpen(false)
	}

	return (
		<div className='flex items-center justify-between mb-12 w-full max-w-[1050px]'>
			<div className='flex items-center'>
				<div className='text-2xl font-bold mr-2'>Игры года</div>
				<img className='max-md:hidden' src={InfoIcon} alt='info-icon' />
				<div className='px-2.5 py-2.5 bg-main-blocks rounded-xl ml-2 text-xs max-w-[200px] max-md:hidden'>
					Вся информация взята с источника «Steam Awards»
				</div>
			</div>

			<div className='relative w-full max-w-[250px] max-md:max-w-[150px]'>
				<div
					onClick={() => setOpen(!open)}
					className='relative flex items-center justify-between w-full rounded-2xl bg-game-year-button px-4 py-3 cursor-pointer'
				>
					<div className='text-2xl font-bold leading-0'>{year}</div>
					<img
						className='absolute w-18 bottom-1 rotate-25 left-20 max-md:hidden'
						src={CrownIcon}
						alt='crown-icon'
					/>
					<img
						className='absolute w-18 left-35 -rotate-25 top-1 max-md:hidden'
						src={CrownIcon}
						alt='crown-icon'
					/>
					<img
						className={open ? 'rotate-90' : ''}
						src={ArrowIcon}
						alt='arrow-icon'
					/>
				</div>

				{open && (
					<div className='absolute top-15 left-0 z-50'>
						{yearsArray
							.filter(item => item !== year)
							.map((year, index) => (
								<div
									key={index}
									onClick={() => selectYearHandler(year)}
									className='relative w-[250px] rounded-2xl bg-game-year-button py-2 cursor-pointer mb-2.5 max-md:w-[150px]'
								>
									<div className='text-2xl font-bold text-center'>{year}</div>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	)
}

export default TitleYear
