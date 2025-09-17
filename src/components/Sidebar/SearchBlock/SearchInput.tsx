import { FC, SetStateAction } from 'react'
import CloseIcon from '../../../assets/icons/close-icon.svg'

interface ISearchInputProps {
	value: string
	setValue: React.Dispatch<SetStateAction<string>>
	sidebarStatus: boolean
}

const SearchInput: FC<ISearchInputProps> = ({
	value,
	setValue,
	sidebarStatus,
}) => {
	return (
		<>
			{sidebarStatus && (
				<input
					id='#search'
					value={value}
					onChange={e => setValue(e.target.value)}
					className='ml-2 border-0 outline-0'
					autoComplete='off'
					type='text'
					placeholder='Поиск'
				/>
			)}

			{value && (
				<img
					onClick={() => setValue('')}
					className='cursor-pointer'
					src={CloseIcon}
					alt='close-icon'
				/>
			)}
		</>
	)
}

export default SearchInput
