import { useAppSelector } from '../../../redux/store'
import SearchedGameBlock from './SearchedGameBlock'

const SearchGamesComponent = () => {
	const { activeSearch } = useAppSelector(state => state.statusSearchBlockSlice)
	const { filteredArray } = useAppSelector(
		state => state.filteredSearchArraySlice
	)

	return (
		activeSearch && (
			<div className='absolute top-0 left-70  w-82 rounded-2xl bg-main-blocks p-2.5'>
				{filteredArray.length === 0 ? (
					<div className='text-center'>Сожалеем, но ничего не найдено</div>
				) : (
					<SearchedGameBlock />
				)}
			</div>
		)
	)
}

export default SearchGamesComponent
