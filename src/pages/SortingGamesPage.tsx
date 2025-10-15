import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import DeleteIcon from '../assets/icons/close-icon.svg'
import SortButton from '../components/MicroComponents/SortButton'
import { filterGenres } from '../components/Sidebar/GenresBlock/Utils'
import Pagination from '../components/SortByGenresPage/Pagination'
import { IGame } from '../types/types'
import { arrayGenres, sortBtns } from '../utils/miniArrays'

const RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY

const SortingGamesPage = () => {
	const [games, setGames] = useState<IGame[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [activeSortButton, setActiveSortButton] = useState(0)
	const [searchGenreValue, setSearchGenreValue] = useState('')
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [filteredGenresArray, setFilteredGenresArray] =
		useState<string[]>(arrayGenres)

	const lastGameIndex = currentPage * 12
	const firstGameIndex = lastGameIndex - 12

	const fetchSortedGames = async () => {
		const options = {
			method: 'GET',
			url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
			params: {
				platform: 'pc',
				category: 'shooter',
				'sort-by': 'release-date',
			},
			headers: {
				'x-rapidapi-key': RAPIDAPI_KEY,
				'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
			},
		}

		try {
			const response = await axios.request(options)
			setGames(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	const selectCategory = (category: string) => {
		const findCategory = selectedCategories.find(item => item === category)
		if (findCategory) return

		setSelectedCategories([...selectedCategories, category])
	}
	const deleteCategory = (category: string) => {
		setSelectedCategories(selectedCategories.filter(item => item !== category))
	}

	useEffect(() => {
		fetchSortedGames()
	}, [])

	useEffect(() => {
		filterGenres(arrayGenres, searchGenreValue, setFilteredGenresArray)
	}, [searchGenreValue])

	return (
		<div className='mt-4'>
			<div className='text-xl font-bold mb-6'>Сортировка игр</div>
			<div className='flex items-start'>
				<div className='flex flex-col w-[85%] h-[840px]'>
					<div className='flex mb-6'>
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
					</div>
					<div className='grid grid-cols-4 gap-4 flex-1'>
						{games.slice(firstGameIndex, lastGameIndex).map(game => (
							<Link className='' to={`/game/${game.id}`} key={game.id}>
								<img
									className='rounded-xl'
									src={game.thumbnail}
									alt='game-image'
								/>
								<div className='text-center mt-2'>{game.title}</div>
							</Link>
						))}
					</div>
					<Pagination
						gamesArray={games}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</div>

				<div className='max-w-[17%]'>
					<div className='text-center mb-2.5'>По категориям</div>
					<div className='ml-4 px-4 pt-4 pb-2 bg-main-blocks rounded-2xl'>
						<div className='flex flex-wrap mb-2.5'>
							{selectedCategories.map((category, index) => (
								<div
									key={index}
									onClick={() => deleteCategory(category)}
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
							<div className='max-h-[500px] pr-2 flex flex-col overflow-x-auto whitespace-nowrap scrollbar'>
								{filteredGenresArray.map((category, index) => (
									<div
										key={index}
										onClick={() => selectCategory(category)}
										className='cursor-pointer mb-1.5 py-1  text-center rounded-lg bg-main-background'
									>
										{category}
									</div>
								))}
							</div>
						) : (
							<div className='text-center'>Ничего не нашли</div>
						)}
						<div className='mt-4 py-1 text-center bg-links-and-borders rounded-md cursor-pointer'>
							Найти игры
						</div>
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
