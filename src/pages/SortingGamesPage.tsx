import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import DeleteIcon from '../assets/icons/close-icon.svg'
import SortButton from '../components/MicroComponents/SortButton'

import NotFoundGif from '../assets/GameImages/notfoundimg.gif'
import Pagination from '../components/MicroComponents/Pagination'
import SkeletonGame from '../components/MicroComponents/Skeletons/SkeletonGame'
import {
	fetchFilteredGames,
	fetchSortedGames,
} from '../redux/slices/dataSlices/sortGames'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { filterGenres } from '../utils/filterCategories'
import { arrayGenres, sortBtns } from '../utils/miniArraysList'

const SortingGamesPage = () => {
	const dispatch = useAppDispatch()
	const { sortedGames, status } = useAppSelector(state => state.sortGamesSlice)

	const categoriesRef = useRef(document.createElement('div'))

	const [currentPage, setCurrentPage] = useState(1)
	const [activeSortButton, setActiveSortButton] = useState(0)
	const [searchGenreValue, setSearchGenreValue] = useState('')
	const [openCategories, setOpenCategories] = useState(false)
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [lastFetchTags, setLastFetchTags] = useState<string[]>([])
	const [filteredGenresArray, setFilteredGenresArray] =
		useState<string[]>(arrayGenres)

	const lastGameIndex = currentPage * 12
	const firstGameIndex = lastGameIndex - 12

	const handleSelectCategory = (category: string) => {
		const findCategory = selectedCategories.find(item => item === category)
		if (findCategory) return

		setSelectedCategories([...selectedCategories, category])
	}
	const handleDeleteCategory = (category: string) => {
		setSelectedCategories(selectedCategories.filter(item => item !== category))
	}

	const handleFilterGames = () => {
		if (selectedCategories.length === 0) return
		if (selectedCategories.length === lastFetchTags.length) return

		setOpenCategories(false)
		setLastFetchTags(selectedCategories)
		setActiveSortButton(-1)
		const tags = selectedCategories.join('.')
		dispatch(fetchFilteredGames(tags))
	}

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (
				categoriesRef.current &&
				!categoriesRef.current.contains(event.target)
			) {
				setOpenCategories(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	useEffect(() => {
		filterGenres(arrayGenres, searchGenreValue, setFilteredGenresArray)
	}, [searchGenreValue])

	useEffect(() => {
		if (activeSortButton === -1) return
		dispatch(fetchSortedGames(sortBtns[activeSortButton].param))
	}, [activeSortButton])

	return (
		<div className='mt-4 max-lg:mt-1'>
			<div className='text-xl font-bold mb-6'>Сортировка игр</div>
			<div className='flex justify-between'>
				<div className='flex flex-col w-[80%] 2xl:h-[86vh] max-lg:w-full max-sm:'>
					<div className='flex items-center mb-6 max-lg:flex-wrap'>
						{sortBtns.map((btn, index) => (
							<SortButton
								key={btn._id}
								activeSortItem={activeSortButton}
								setActiveSortItem={setActiveSortButton}
								number={index}
							>
								{btn.title}
							</SortButton>
						))}

						<div
							onClick={() => setOpenCategories(true)}
							className='bg-links-and-borders cursor-pointer py-2 px-4 rounded-xl mr-4 lg:hidden max-lg:text-sm max-lg:mr-2 max-lg:py-2 max-lg:px-2.5'
						>
							По категориям
						</div>
					</div>

					{Array.isArray(sortedGames) ? (
						<>
							<div className='grid grid-cols-4 gap-4 flex-1 max-xl:grid-cols-3 max-md:grid-cols-2 max-md:gap-2'>
								{status === 'loading' ? (
									[...new Array(12)].map((_, index) => (
										<SkeletonGame key={index} width={300} height={250} />
									))
								) : status === 'error' ? (
									<div>Ошибка</div>
								) : (
									sortedGames.slice(firstGameIndex, lastGameIndex).map(game => (
										<Link className='' to={`/game/${game.id}`} key={game.id}>
											<img
												className='rounded-xl'
												src={game.thumbnail}
												alt='game-image'
											/>
											<div className='text-center mt-2 max-lg:text-sm'>
												{game.title}
											</div>
										</Link>
									))
								)}
							</div>

							{status === 'success' && (
								<Pagination
									gamesArray={sortedGames}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
								/>
							)}
						</>
					) : (
						<div className='self-center flex flex-col items-center'>
							<div className='text-2xl text-bold'>
								К сожалению, ничего не найдено
							</div>
							<img src={NotFoundGif} alt='gif' />
						</div>
					)}
				</div>

				<div
					className={`max-w-[265px] max-lg:fixed top-15 right-0 ${
						openCategories ? 'max-lg:block' : 'max-lg:hidden'
					} `}
				>
					<div className='text-center mb-2.5 max-lg:hidden'>По категориям</div>
					<div
						ref={categoriesRef}
						className='ml-4 px-4 pt-4 pb-2 bg-main-blocks rounded-2xl'
					>
						<div className='flex flex-wrap mb-2.5'>
							{selectedCategories.map((category, index) => (
								<div
									key={index}
									onClick={() => handleDeleteCategory(category)}
									className='flex items-center py-1 px-2.5 rounded-md bg-main-background border-1 border-main-blocks text-xs mr-1 mb-1 hover:border-red-600 cursor-pointer hover:bg-red-400'
								>
									<div>{category}</div>
									<img
										className='w-4 ml-1'
										src={DeleteIcon}
										alt='delete-icon'
									/>
								</div>
							))}
						</div>
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
							<div className='max-h-[500px] pr-2 flex flex-col overflow-x-auto whitespace-nowrap scrollbar max-lg:max-h-[350px]'>
								{filteredGenresArray.map((category, index) => (
									<div
										key={index}
										onClick={() => handleSelectCategory(category)}
										className='cursor-pointer mb-1.5 py-1  text-center rounded-lg bg-main-background'
									>
										{category}
									</div>
								))}
							</div>
						) : (
							<div className='text-center'>Ничего не нашли</div>
						)}
						<button
							onClick={handleFilterGames}
							disabled={selectedCategories.length === 0}
							className={`${
								selectedCategories.length === 0
									? 'bg-gray-600 text-gray-700 cursor-not-allowed'
									: 'bg-links-and-borders cursor-pointer'
							} w-full mt-4 py-1 text-center  rounded-md `}
						>
							Найти игры
						</button>
						<div
							onClick={() => setSelectedCategories([])}
							className='mt-4 py-2 text-center bg-youtube-link rounded-md px-0.5 text-sm cursor-pointer'
						>
							Очистить фильтрацию
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SortingGamesPage
