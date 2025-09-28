import { useEffect } from 'react'
import { useParams } from 'react-router'
import { fetchGameById } from '../redux/slices/dataSlices/gameByIdSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'

import GameInfoBlock from '../components/GamePage/GameInfoBlock/GameInfoBlock'
import GameMainBlock from '../components/GamePage/GameMainBlock/GameMainBlock'
import GameReviewsBlock from '../components/GamePage/GameReviewsBlock/GameReviewsBlock'
import GameSimilarsBlock from '../components/GamePage/GameSimilarsBlock/GameSimilarsBlock'

const GamePage = () => {
	const dispatch = useAppDispatch()
	const { game, status } = useAppSelector(state => state.gameByIdSlice)
	const { id } = useParams()

	useEffect(() => {
		if (id !== undefined) {
			dispatch(fetchGameById(id))
		}
	}, [id, dispatch])

	return status === 'loading' ? (
		<div>Загрузка...</div>
	) : status === 'error' ? (
		<div className='w-full h-[900px] flex items-center justify-center text-2xl italic'>
			К сожалению игра не найдена
		</div>
	) : (
		status === 'success' &&
		game && (
			<div>
				<GameMainBlock game={game} />
				<div className='mt-12 mx-12'>
					<GameInfoBlock />
					<GameReviewsBlock />
					<GameSimilarsBlock />
				</div>
			</div>
		)
	)
}

export default GamePage
