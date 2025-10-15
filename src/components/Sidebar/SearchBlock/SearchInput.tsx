import { FC, SetStateAction } from 'react'
import CloseIcon from '../../../assets/icons/close-icon.svg'

interface ISearchInputProps {
	value: string
	setValue: React.Dispatch<SetStateAction<string>>
}

const SearchInput: FC<ISearchInputProps> = ({ value, setValue }) => {
	return (
		<>
			<input
				id='#search'
				value={value}
				onChange={e => setValue(e.target.value)}
				className='ml-2 border-0 outline-0'
				autoComplete='off'
				type='text'
				placeholder='Поиск игр'
			/>

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
