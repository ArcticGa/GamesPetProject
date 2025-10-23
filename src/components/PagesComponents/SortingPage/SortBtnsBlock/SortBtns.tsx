import { SetStateAction } from 'react'
import { sortBtns } from '../../../../utils/miniArraysList'
import SortButton from '../../../MicroComponents/SortButton'

type SortBtnsProps = {
	activeSortButton: number
	setActiveSortButton: React.Dispatch<SetStateAction<number>>
	setOpenCategories: React.Dispatch<SetStateAction<boolean>>
}

const SortBtns = ({
	activeSortButton,
	setActiveSortButton,
	setOpenCategories,
}: SortBtnsProps) => {
	return (
		<div className='flex items-center mb-6 max-lg:flex-wrap'>
			{sortBtns.map((btn, index) => (
				<SortButton
					key={btn._id}
					activeSortItem={activeSortButton}
					setActiveSortItem={setActiveSortButton}
					number={index}
				>
					{btn.title}
				</SortButton>
			))}

			<div
				onClick={() => setOpenCategories(true)}
				className='bg-links-and-borders cursor-pointer py-2 px-4 rounded-xl mr-4 lg:hidden max-lg:text-sm max-lg:mr-2 max-lg:py-2 max-lg:px-2.5'
			>
				По категориям
			</div>
		</div>
	)
}

export default SortBtns
