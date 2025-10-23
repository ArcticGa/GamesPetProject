import { SetStateAction } from 'react'
import { fetchFilteredGames } from '../../../../redux/slices/dataSlices/sortGames'
import { useAppDispatch } from '../../../../redux/store'

type BtnsBlockProps = {
	selectedCategories: string[]
	lastFetchTags: string[]

	setSelectedCategories: React.Dispatch<SetStateAction<string[]>>
	setLastFetchTags: React.Dispatch<SetStateAction<string[]>>
	setOpenCategories: React.Dispatch<SetStateAction<boolean>>
	setActiveSortButton: React.Dispatch<SetStateAction<number>>
}

const BtnsBlock = ({
	selectedCategories,
	lastFetchTags,

	setSelectedCategories,
	setOpenCategories,
	setActiveSortButton,
	setLastFetchTags,
}: BtnsBlockProps) => {
	const dispatch = useAppDispatch()

	const handleFilterGames = () => {
		if (selectedCategories.length === 0) return
		if (selectedCategories.length === lastFetchTags.length) return

		setOpenCategories(false)
		setLastFetchTags(selectedCategories)
		setActiveSortButton(-1)
		const tags = selectedCategories.join('.')
		dispatch(fetchFilteredGames(tags))
	}

	return (
		<>
			<button
				onClick={handleFilterGames}
				disabled={selectedCategories.length === 0}
				className={`${
					selectedCategories.length === 0
						? 'bg-gray-600 text-gray-700 cursor-not-allowed'
						: 'bg-links-and-borders cursor-pointer'
				} w-full mt-4 py-1 text-center  rounded-md `}
			>
				Найти игры
			</button>

			<div
				onClick={() => setSelectedCategories([])}
				className='mt-4 py-2 text-center bg-youtube-link rounded-md px-0.5 text-sm cursor-pointer'
			>
				Очистить фильтрацию
			</div>
		</>
	)
}

export default BtnsBlock
