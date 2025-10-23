import { SetStateAction } from 'react'

type SearchCategoriesInputProps = {
	searchGenreValue: string
	setSearchGenreValue: React.Dispatch<SetStateAction<string>>
}

const SearchCategoriesInput = ({
	searchGenreValue,
	setSearchGenreValue,
}: SearchCategoriesInputProps) => {
	return (
		<input
			id='#searchGenre'
			value={searchGenreValue}
			onChange={e => setSearchGenreValue(e.target.value)}
			className='outline-none border-links-and-borders border-1 px-2.5 py-0.5 rounded-md mb-3'
			autoComplete='off'
			type='text'
			placeholder='Поиск'
		/>
	)
}

export default SearchCategoriesInput
