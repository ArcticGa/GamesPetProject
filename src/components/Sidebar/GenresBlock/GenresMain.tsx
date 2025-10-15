import { useState } from 'react'
import ArrowIcon from '../../../assets/icons/arrow-down.svg'
import GenresIcon from '../../../assets/icons/database.svg'
import GenresList from './GenresList'

const GenresMain = () => {
	const [openedGenres, setOpenedGenres] = useState(false)

	return (
		<div className='mt-5'>
			<div
				onClick={() => setOpenedGenres(!openedGenres)}
				className='flex items-center mb-3 cursor-pointer justify-between pl-2'
			>
				<div className='flex items-center'>
					<img src={GenresIcon} alt='genres-icon' />
					<span className='ml-2.5'>Жанры</span>
				</div>

				<img
					className={openedGenres ? 'rotate-90' : undefined}
					src={ArrowIcon}
					alt='arrow-icon'
				/>
			</div>

			{openedGenres && <GenresList openedGenres={openedGenres} />}
		</div>
	)
}

export default GenresMain
