import { useEffect, useState } from 'react'
import SearchIcon from '../../../assets/icons/search-icon.svg'
import { fetchGames } from '../../../redux/slices/dataSlices/gamesSlice'
import { setSearchBlock } from '../../../redux/slices/sidebarSlices/statusSearchBlockSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { IGame } from '../../../types/types'
import { useDebounce } from '../../../utils/hooks/debounce'
import SearchGamesComponent from './SearchGamesComponent'
import SearchInput from './SearchInput'
import { filterFunc } from './Utils'

const SearchMain = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	const [value, setValue] = useState('')
	const [filteredArray, setFilteredArray] = useState<IGame[]>([])
	const dispatch = useAppDispatch()
	const debounced = useDebounce(value)
	const { activeSearch } = useAppSelector(state => state.statusSearchBlockSlice)
	const { games } = useAppSelector(state => state.gamesSlice)

	useEffect(() => {
		dispatch(fetchGames())
	}, [])

	useEffect(() => {
		if (games.length === 0) return

		if (!sidebarStatus) {
			return setValue('')
		}

		dispatch(setSearchBlock(debounced.length > 0))
		setFilteredArray(filterFunc(debounced, games))
	}, [games, debounced, sidebarStatus, dispatch])

	return (
		<div className='relative'>
			<div className='flex items-center p-2.5 border-b border-b-white mb-9'>
				<img src={SearchIcon} alt='search-icon' />
				<SearchInput
					value={value}
					setValue={setValue}
					sidebarStatus={sidebarStatus}
				/>
			</div>

			{activeSearch && (
				<SearchGamesComponent
					filteredArray={filteredArray}
					setValue={setValue}
				/>
			)}
		</div>
	)
}

export default SearchMain
