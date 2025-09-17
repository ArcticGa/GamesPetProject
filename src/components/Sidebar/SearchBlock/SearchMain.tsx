import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SearchIcon from '../../../assets/icons/search-icon.svg'
import { useAppSelector } from '../../../redux/store'
import SearchGamesComponent from './SearchGamesComponent'
import SearchInput from './SearchInput'
import { debounceFunc, isSearchEmpty } from './Utils'

const SearchMain = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	const dispatch = useDispatch()
	const { searchValue } = useAppSelector(state => state.valueSearchBlockSlice)
	const { activeSearch } = useAppSelector(state => state.statusSearchBlockSlice)

	useEffect(() => {
		isSearchEmpty(searchValue, dispatch)

		const debounce = setTimeout(() => {
			debounceFunc(searchValue, dispatch)
		}, 500)

		return () => clearTimeout(debounce)
	}, [searchValue, dispatch])

	return (
		<div className='relative'>
			<div className='flex items-center p-2.5 border-b border-b-white mb-9'>
				<img src={SearchIcon} alt='search-icon' />
				<SearchInput sidebarStatus={sidebarStatus} />
			</div>

			{activeSearch && <SearchGamesComponent />}
		</div>
	)
}

export default SearchMain
