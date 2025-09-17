import { useAppSelector } from '../../../redux/store'
import { arraySearchGames } from '../../../utils/MiniArrays'

const SearchedGameBlock = () => {
	const { filteredArray } = useAppSelector(
		state => state.filteredSearchArraySlice
	)

	return filteredArray.map(game => (
		<div
			key={game._id}
			className={`flex items-center cursor-pointer p-3 bg-main-background rounded-xl ${
				arraySearchGames.length > 1 ? 'mb-2' : ''
			} `}
		>
			<div className='mr-3'>
				<img className='w-17' src={game.image} alt={game.nameGame} />
			</div>
			<div>
				<div className='font-bold text-xl'>{game.nameGame}</div>
				<div className='text-xs text-gray-500'>{game.developer}</div>
				<div>
					{game.genres.map(genre => (
						<span
							key={genre._id}
							className='text-mini py-0.5 px-2 mr-1 bg-genres-bg text-genres-text rounded-lg'
						>
							{genre.title}
						</span>
					))}
				</div>
				<div className='text-mini'>Дата релиза: {game.dateReleased}</div>
			</div>
		</div>
	))
}

export default SearchedGameBlock
