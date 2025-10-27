import { useEffect, useState } from 'react'
import NotFound from '../components/MicroComponents/NotFound'
import CategoriesSortBlock from '../components/PagesComponents/SortingPage/CategoriesSortBlock/CategoriesSortBlock'
import GamesList from '../components/PagesComponents/SortingPage/GamesListBlock/GamesList'
import SortBtns from '../components/PagesComponents/SortingPage/SortBtnsBlock/SortBtns'
import { fetchSortedGames } from '../redux/slices/dataSlices/sortGames'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { sortBtns } from '../utils/miniArraysList'

const SortingGamesPage = () => {
	const dispatch = useAppDispatch()
	const { sortedGames } = useAppSelector(state => state.sortGamesSlice)

	const [activeSortButton, setActiveSortButton] = useState(0)
	const [openCategories, setOpenCategories] = useState(false)

	useEffect(() => {
		if (activeSortButton === -1) return
		dispatch(fetchSortedGames({ sortBy: sortBtns[activeSortButton].param }))
	}, [activeSortButton])

	return (
		<div className='mt-4 max-lg:mt-1'>
			<div className='text-xl font-bold mb-6'>Сортировка игр</div>
			<div className='flex justify-between'>
				<div className='flex flex-col w-[80%] 2xl:h-[86vh] max-lg:w-full max-sm:'>
					<SortBtns
						activeSortButton={activeSortButton}
						setActiveSortButton={setActiveSortButton}
						setOpenCategories={setOpenCategories}
					/>

					{Array.isArray(sortedGames) ? (
						<GamesList />
					) : (
						<NotFound text='К сожалению, ничего не найдено' />
					)}
				</div>

				<div
					className={`max-w-[265px] max-lg:fixed top-15 right-0 ${
						openCategories ? 'max-lg:block' : 'max-lg:hidden'
					} `}
				>
					<div className='text-center mb-2.5 max-lg:hidden'>По категориям</div>

					<CategoriesSortBlock
						setActiveSortButton={setActiveSortButton}
						setOpenCategories={setOpenCategories}
					/>
				</div>
			</div>
		</div>
	)
}

export default SortingGamesPage
