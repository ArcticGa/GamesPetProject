import { useEffect, useState } from 'react'
import TitleYear from '../components/PagesComponents/YearPage/TitleYear'
import { fetchGamesYear } from '../redux/slices/dataSlices/gameYearsSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'

import SkeletonYearPage from '../components/MicroComponents/Skeletons/SkeletonYearPage'
import Award from '../components/PagesComponents/YearPage/Award'
import HeaderYear from '../components/PagesComponents/YearPage/HeaderYear'
import { awardsList } from '../utils/miniArraysList'

const GamesOfYear = () => {
	const [year, setYear] = useState(2024)

	const dispatch = useAppDispatch()
	const { gamesYear, status } = useAppSelector(state => state.gameYearSlice)

	useEffect(() => {
		dispatch(fetchGamesYear(year))
	}, [year])

	return (
		<div className='flex flex-col items-center pt-8 max-lg:pt-2'>
			<HeaderYear />
			<TitleYear year={year} setYear={setYear} />

			{status === 'loading' ? (
				<>
					<SkeletonYearPage />
					<SkeletonYearPage />
				</>
			) : status === 'error' ? (
				<div>Игры {year} года появятся позже</div>
			) : (
				status === 'success' &&
				awardsList.map(award => <Award data={award} gamesYear={gamesYear} />)
			)}
		</div>
	)
}

export default GamesOfYear
