import { SetStateAction } from 'react'

type SortButtonProps = {
	children: React.ReactNode
	setActiveSortItem: React.Dispatch<SetStateAction<number>>
	activeSortItem: number
	number: number
}

const SortButton = ({
	children,
	setActiveSortItem,
	activeSortItem,
	number,
}: SortButtonProps) => {
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

export default SortButton
