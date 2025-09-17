import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../../redux/slices/sidebarSlices/valueSearchBlockSlice'
import { useAppSelector } from '../../../redux/store'

import CloseIcon from '../../../assets/icons/close-icon.svg'

const SearchInput = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	const dispatch = useDispatch()
	const { searchValue } = useAppSelector(state => state.valueSearchBlockSlice)

	return (
		<>
			{sidebarStatus && (
				<input
					id='#search'
					value={searchValue}
					onChange={e => dispatch(setSearchValue(e.target.value))}
					className='ml-2 border-0 outline-0'
					autoComplete='off'
					type='text'
					placeholder='Поиск'
				/>
			)}

			{searchValue && (
				<img
					onClick={() => dispatch(setSearchValue(''))}
					className='cursor-pointer'
					src={CloseIcon}
					alt='close-icon'
				/>
			)}
		</>
	)
}

export default SearchInput
