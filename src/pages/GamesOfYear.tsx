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
				<div className='bg-main-blocks rounded-2xl py-4 px-2 mb-10 text-center'>
					<div>Данная страница является Информационной.</div>
					<div>Игры приведенные ниже НЕ ИМЕЮТ отдельных страниц на сайте.</div>
					<div>( Прошу прощение, доделаю этот момент позже 😟 )</div>
				</div>

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
