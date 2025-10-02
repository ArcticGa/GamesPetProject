import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import GamesList from '../components/SortByGenresPage/GamesList'
import Pagination from '../components/SortByGenresPage/Pagination'
import TitleGenrePage from '../components/SortByGenresPage/TitleGenrePage'
import { fetchGamesByCategory } from '../redux/slices/dataSlices/gamesByCategory'
import { useAppDispatch, useAppSelector } from '../redux/store'

const SortedGamesByGenre = () => {
	const dispatch = useAppDispatch()
	const { category } = useParams()
	const [currentPage, setCurrentPage] = useState(1)
	const { gamesByCategory, status } = useAppSelector(
		state => state.gamesByCategorySlice
	)

	useEffect(() => {
		if (category !== undefined) {
			setCurrentPage(1)
			dispatch(fetchGamesByCategory(category))
		}
	}, [category, dispatch])

	return status === 'loading' ? (
		<div>Загрузка...</div>
	) : status === 'error' ? (
		<div>Ошибка</div>
	) : (
		status === 'success' &&
		category &&
		gamesByCategory && (
			<div className='px-2 py-4 flex flex-col h-[920px]'>
				<TitleGenrePage category={category} />
				<GamesList gamesArray={gamesByCategory} currentPage={currentPage} />
				<Pagination
					gamesArray={gamesByCategory}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		)
	)
}

export default SortedGamesByGenre
