import { SetStateAction } from 'react'
import { setSearchBlock } from '../../../redux/slices/sidebarSlices/statusSearchBlockSlice'
import { useAppDispatch } from '../../../redux/store'
import { IGame } from '../../../types/types'

const SearchedGameBlock = ({
	filteredArray,
	setValue,
}: {
	filteredArray: IGame[]
	setValue: React.Dispatch<SetStateAction<string>>
}) => {
	const dispatch = useAppDispatch()

	const openGame = () => {
		dispatch(setSearchBlock(false))
		setValue('')
	}

	return filteredArray.map(game => (
		<div
			key={game.id}
			onClick={() => openGame()}
			className={`flex bg-main-background items-center cursor-pointer p-3 px-4 rounded-xl ${
				filteredArray.length > 1 ? 'mb-2' : ''
			} `}
		>
			<div className='mr-3'>
				<img className='w-30' src={game?.thumbnail} alt={game.title} />
			</div>
			<div>
				<div className='font-bold text-sm'>{game?.title}</div>
				<div className='text-xs text-gray-500'>{game.developer}</div>
				<span className='text-mini py-0.5 px-2 mr-1 bg-genres-bg text-genres-text rounded-lg'>
					{game?.genre}
				</span>
				<div className='text-xs'>Релиз: {game?.release_date}</div>
			</div>
		</div>
	))
}

export default SearchedGameBlock
