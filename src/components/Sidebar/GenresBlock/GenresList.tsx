import { useEffect, useState } from 'react'
import { arrayGenres } from '../../../utils/MiniArrays'
import { filterGenres } from './Utils'

const GenresList = ({ openedGenres }: { openedGenres: boolean }) => {
	const [searchGenreValue, setSearchGenreValue] = useState('')
	const [filteredGenresArray, setFilteredGenresArray] = useState(arrayGenres)

	useEffect(() => {
		setSearchGenreValue('')
	}, [openedGenres])

	useEffect(() => {
		filterGenres(arrayGenres, searchGenreValue, setFilteredGenresArray)
	}, [searchGenreValue])

	return (
		<div className=' mt-3 px-4 pt-4 pb-2 bg-main-background rounded-xl'>
			<input
				id='#searchGenre'
				value={searchGenreValue}
				onChange={e => setSearchGenreValue(e.target.value)}
				className='outline-none border-links-and-borders border-1 px-2.5 py-0.5 rounded-md mb-3'
				autoComplete='off'
				type='text'
				placeholder='Поиск'
			/>

			{filteredGenresArray.length !== 0 ? (
				<div className='max-h-37 overflow-x-auto whitespace-nowrap no-scrollbar'>
					{filteredGenresArray.map((genre, index) => (
						<div
							key={index}
							className='cursor-pointer mb-1.5 py-1 bg-main-blocks text-center rounded-md '
						>
							{genre}
						</div>
					))}
				</div>
			) : (
				<div className='text-center'>Ничего не нашли</div>
			)}
		</div>
	)
}

export default GenresList
