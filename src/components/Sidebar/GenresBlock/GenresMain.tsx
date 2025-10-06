import { useState } from 'react'
import ArrowIcon from '../../../assets/icons/arrow-down.svg'
import GenresIcon from '../../../assets/icons/database.svg'
import GenresList from './GenresList'
import { stylesCategories } from './Utils'

const GenresMain = ({ sidebarStatus }: { sidebarStatus: boolean }) => {
	const [openedGenres, setOpenedGenres] = useState(false)

	return (
		<div className='mt-5'>
			<div
				onClick={() => setOpenedGenres(!openedGenres)}
				className={stylesCategories(sidebarStatus)}
			>
				<div className='flex items-center'>
					<img src={GenresIcon} alt='genres-icon' />
					{sidebarStatus && <span className='ml-2.5'>Жанры</span>}
				</div>
				{sidebarStatus && (
					<img
						className={openedGenres ? 'rotate-90' : undefined}
						src={ArrowIcon}
						alt='arrow-icon'
					/>
				)}
			</div>

			{openedGenres && sidebarStatus && (
				<GenresList openedGenres={openedGenres} />
			)}
		</div>
	)
}

export default GenresMain
