import { FC, SetStateAction } from 'react'

interface ISortBlock {
	children: React.ReactNode
	setActiveSortItem: React.Dispatch<SetStateAction<number>>
	activeSortItem: number
	number: number
}

const SortBlock: FC<ISortBlock> = ({
	children,
	setActiveSortItem,
	activeSortItem,
	number,
}) => {
	return (
		<div
			onClick={() => setActiveSortItem(number)}
			className={`${
				activeSortItem === number
					? 'text-links-and-borders  border-links-and-borders'
					: 'border-main-blocks'
			} cursor-pointer border-1  py-2 px-4 bg-main-blocks rounded-xl mr-4`}
		>
			{children}
		</div>
	)
}

export default SortBlock
