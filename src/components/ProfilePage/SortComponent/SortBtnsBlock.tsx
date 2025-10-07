import { SetStateAction } from 'react'
import { arraySortProfileBtns } from '../../../utils/miniArrays'

type SortBtnsBlockProps = {
	activeSortBtn: number
	setActiveSortBtn: React.Dispatch<SetStateAction<number>>
}

const SortBtnsBlock = ({
	activeSortBtn,
	setActiveSortBtn,
}: SortBtnsBlockProps) => {
	return (
		<div className='flex items-center justify-center mb-8'>
			{arraySortProfileBtns.map((item, index) => (
				<div
					key={index}
					onClick={() => setActiveSortBtn(index)}
					className={`${
						activeSortBtn === index ? 'bg-links-and-borders' : 'bg-main-blocks'
					}  py-2 px-4 mx-3 rounded-xl cursor-pointer`}
				>
					{item}
				</div>
			))}
		</div>
	)
}

export default SortBtnsBlock
