import { useEffect, useState } from 'react'
import Award from '../components/YearPage/Award'
import TitleYear from '../components/YearPage/TitleYear'
import { fetchGamesYear } from '../redux/slices/dataSlices/gameYearsSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { awardsList } from '../utils/miniArrays'

const GamesOfYear = () => {
	const [year, setYear] = useState(2025)

	const dispatch = useAppDispatch()
	const { gamesYear, status } = useAppSelector(state => state.gameYearSlice)

	useEffect(() => {
		dispatch(fetchGamesYear(year))
	}, [year, dispatch])

	return status === 'loading' ? (
		<div>Загрузка...</div>
	) : status === 'error' ? (
		<div>Ошибка :(</div>
	) : (
		status === 'success' && (
			<div className='px-60 pt-8'>
				<TitleYear setYear={setYear} />
				{awardsList.map(award => (
					<div key={award.id} className='flex flex-col items-center'>
						<Award data={award} gamesYear={gamesYear} />
					</div>
				))}
			</div>
		)
	)
}

export default GamesOfYear
