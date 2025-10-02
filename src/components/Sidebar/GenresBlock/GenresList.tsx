import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAppSelector } from '../../../redux/store'
import { arrayGenres } from '../../../utils/miniArrays'
import { filterGenres } from './Utils'

const GenresList = ({ openedGenres }: { openedGenres: boolean }) => {
	const { activeLink } = useAppSelector(state => state.linksSlice)
	const [searchGenreValue, setSearchGenreValue] = useState('')
	const [filteredGenresArray, setFilteredGenresArray] =
		useState<string[]>(arrayGenres)

	useEffect(() => {
		setSearchGenreValue('')
	}, [openedGenres])

	useEffect(() => {
		filterGenres(arrayGenres, searchGenreValue, setFilteredGenresArray)
	}, [searchGenreValue])

	console.log(activeLink)

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
				<div className='max-h-37 pr-2 flex flex-col overflow-x-auto whitespace-nowrap scrollbar'>
					{filteredGenresArray.map((genre, index) => (
						<Link
							to={`/sorted/${genre}`}
							key={index}
							className={`cursor-pointer mb-1.5 py-1  text-center rounded-md ${
								activeLink === `/sorted/${genre}`
									? 'bg-links-and-borders'
									: 'bg-main-blocks'
							} `}
						>
							{genre}
						</Link>
					))}
				</div>
			) : (
				<div className='text-center'>Ничего не нашли</div>
			)}
		</div>
	)
}

export default GenresList
