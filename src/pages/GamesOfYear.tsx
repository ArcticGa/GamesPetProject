import { useEffect, useState } from 'react'
import TitleYear from '../components/YearPage/TitleYear'
import { fetchGamesYear } from '../redux/slices/dataSlices/gameYearsSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'

import AniGif from '../assets/GameImages/notfoundimg.gif'
import SkeletonYearPage from '../components/MicroComponents/Skeletons/SkeletonYearPage'
import Award from '../components/YearPage/Award'
import { awardsList } from '../utils/miniArraysList'

const GamesOfYear = () => {
	const [year, setYear] = useState(2024)

	const dispatch = useAppDispatch()
	const { gamesYear, status } = useAppSelector(state => state.gameYearSlice)

	useEffect(() => {
		dispatch(fetchGamesYear(year))
	}, [year])

	return (
		<div className='px-60 pt-8'>
			<div className='relative bg-main-blocks rounded-2xl py-4 px-2 mb-10 text-center'>
				<div>
					<div>Данная страница является Информационной.</div>
					<div>Игры приведенные ниже НЕ ИМЕЮТ отдельных страниц на сайте.</div>
					<div>(Игры ведут на отдельную страницу в Steam)</div>
				</div>
				<img className='w-25 absolute top-0 right-10' src={AniGif} alt='gif' />
			</div>

			<TitleYear year={year} setYear={setYear} />

			{status === 'loading' ? (
				<>
					<SkeletonYearPage />
					<SkeletonYearPage />
				</>
			) : status === 'error' ? (
				<div>Ошибка</div>
			) : (
				status === 'success' &&
				awardsList.map(award => (
					<div key={award.id} className='flex flex-col items-center'>
						<Award data={award} gamesYear={gamesYear} />
					</div>
				))
			)}
		</div>
	)
}

export default GamesOfYear
