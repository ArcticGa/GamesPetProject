import { SetStateAction } from 'react'
import { Link } from 'react-router'
import { setSearchBlock } from '../../../redux/slices/sidebarSlices/statusSearchBlockSlice'
import { useAppDispatch } from '../../../redux/store'
import { IGame } from '../../../types/types'

type SearchGameBlockProps = {
	filteredArray: IGame[]
	setValue: React.Dispatch<SetStateAction<string>>
}

const SearchedGameBlock = ({
	filteredArray,
	setValue,
}: SearchGameBlockProps) => {
	const dispatch = useAppDispatch()

	const openGame = () => {
		dispatch(setSearchBlock(false))
		setValue('')
	}

	return filteredArray.map(game => (
		<Link
			key={game.id}
			to={`/game/${game.id}`}
			onClick={() => openGame()}
			className={`flex bg-main-background items-center cursor-pointer p-3 px-4 rounded-xl ${
				filteredArray.length > 1 ? 'mb-2' : null
			} `}
		>
			<div className='mr-3'>
				<img className='w-30' src={game?.thumbnail} alt={game.title} />
			</div>
			<div>
				<div className='font-bold text-sm max-sm:text-xs'>{game?.title}</div>
				<div className='text-xs text-gray-500'>{game.developer}</div>
				<span className='text-mini py-0.5 px-2 mr-1 bg-genres-bg text-genres-text rounded-lg'>
					{game?.genre}
				</span>
				<div className='text-xs'>Релиз: {game?.release_date}</div>
			</div>
		</Link>
	))
}

export default SearchedGameBlock
