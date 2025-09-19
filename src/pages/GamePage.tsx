import { useEffect } from 'react'
import { useParams } from 'react-router'
import { fetchGameById } from '../redux/slices/dataSlices/gameByIdSlice'
import { useAppDispatch } from '../redux/store'

import GameInfoBlock from '../components/GamePage/GameInfoBlock/GameInfoBlock'
import GameMainBlock from '../components/GamePage/GameMainBlock/GameMainBlock'
import GameReviewsBlock from '../components/GamePage/GameReviewsBlock/GameReviewsBlock'

const GamePage = () => {
	const dispatch = useAppDispatch()
	const { id } = useParams()

	useEffect(() => {
		dispatch(fetchGameById(id))
	}, [id])

	return (
		<div>
			<GameMainBlock />
			<div className='mt-12 mx-12'>
				<GameInfoBlock />
				<GameReviewsBlock />
			</div>
		</div>
	)
}

export default GamePage
