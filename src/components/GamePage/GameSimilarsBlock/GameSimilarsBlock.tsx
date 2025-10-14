import { useEffect, useState } from 'react'
import '../../../index.css'
import { useAppSelector } from '../../../redux/store'
import { IGame } from '../../../types/types'
import { useFilterByGenre } from '../../../utils/hooks/filterByGenre'
import GamesBlock from '../../HomePage/GamesBlock'

const GameSimilarsBlock = () => {
	const [similarGames, setSimilarGames] = useState<IGame[]>([])
	const { games } = useAppSelector(state => state.gamesSlice)
	const { game } = useAppSelector(state => state.gameByIdSlice)

	const filteredArr = useFilterByGenre(games, game?.genre)
	const updatedArr = filteredArr?.filter(item => item?.id !== game?.id)

	useEffect(() => {
		if (updatedArr) {
			setSimilarGames(updatedArr)
		}
	}, [games, game])

	return (
		<div>
			{similarGames.length !== 0 && (
				<GamesBlock
					array={similarGames}
					titleBlock='Похожие игры'
					type='games'
				/>
			)}

			{/* <Swiper
				modules={[Scrollbar]}
				className='!pb-1 !m-0'
				slidesPerView={5}
				grabCursor
				scrollbar={{ draggable: true }}
			>
				{similarGames.map(game => (
					<SwiperSlide>
						<Link to={`/game/${game.id}`} key={game.id} className='mr-4'>
							<img
								className='max-w-70 mb-2 rounded-xl'
								src={game.thumbnail}
								alt='game-img'
							/>
							<div className='text-center text-lg'>{game.title}</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper> */}
			{/* <div className='flex max-w-full overflow-x-auto scrollbar'>
				{similarGames.map(game => (
					<Link to={`/game/${game.id}`} key={game.id} className='mr-4'>
						<img
							className='max-w-70 mb-2 rounded-xl'
							src={game.thumbnail}
							alt='game-img'
						/>
						<div className='text-center text-lg'>{game.title}</div>
					</Link>
				))}
			</div> */}
		</div>
	)
}

export default GameSimilarsBlock

{
	/* <Swiper
				modules={[Scrollbar]}
				className='!pb-4 !m-0'
				slidesPerView={5}
				grabCursor
				scrollbar={{ draggable: true }}
			>
				{type === 'games' &&
					(array as IGame[]).map(item => (
						<SwiperSlide key={item.id}>
							<Link
								to={`/game/${item.id}`}
								className='flex flex-col items-center'
							>
								<img
									className='max-w-67 mb-2 rounded-xl'
									src={item.thumbnail}
									alt='game-image'
								/>

								<div className='text-center text-lg max-w-[270px] overflow-hidden'>
									{item.title}
								</div>
							</Link>
						</SwiperSlide>
					))}

				{type === 'genres' &&
					(array as string[]).map((item, index) => (
						<SwiperSlide key={index}>
							<Link
								to={`/sorted/${item}`}
								className='h-[150px] w-[267px] bg-main-blocks flex items-center justify-center text-xl font-bold rounded-xl border-1 border-main-background hover:border-links-and-borders'
							>
								{item}
							</Link>
						</SwiperSlide>
					))}
			</Swiper> */
}
