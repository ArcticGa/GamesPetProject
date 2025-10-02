import { useEffect, useState } from 'react'
import { IFullGame } from '../../../types/types'
import Description from './Description'
import Info from './Info'
import Options from './Options'

const GameMainBlock = ({ game }: { game: IFullGame }) => {
	const [activeBtn, setActiveBtn] = useState(1)

	const addGameToViewedArray = () => {
		const jsonArray = localStorage.getItem('viewedGames')
		if (jsonArray) {
			const array: number[] = JSON.parse(jsonArray)
			const item = array.find(item => item === game.id)
			if (!item) {
				array.push(game.id)
				localStorage.setItem('viewedGames', JSON.stringify(array))
			}
		} else {
			localStorage.setItem('viewedGames', JSON.stringify([game.id]))
		}
	}

	useEffect(() => {
		addGameToViewedArray()
	}, [])

	return (
		<div
			className={`${
				activeBtn === 1 ? 'bgImage' : 'bg-main-blocks'
			}  w-full h-[500px] rounded-3xl pl-[50px] pr-[20px] flex items-center justify-between`}
		>
			<div>
				<img
					className='w-80 rounded-t-lg'
					src={game.thumbnail}
					alt='game-img'
				/>
				<div>
					<div className='text-2xl max-w-80 mb-3 text-center font-bold bg-main-background border-1 border-t-0 border-links-and-borders p-1 rounded-b-lg'>
						{game.title}
					</div>
				</div>

				<Info title='Разработчик:' info={game.developer} />
				<Info title='Издатель:' info={game.publisher} />
				<Info title='Дата выхода:' info={game.release_date} />
				<Info title='Жанр:' info={game.genre} />

				<div className='mt-7'>
					<a
						className='bg-main-background border-1 border-links-and-borders text-xl px-4 py-2 rounded-lg'
						href={game.game_url}
						target='_blank'
					>
						Официальная страница
					</a>
				</div>
			</div>

			{activeBtn === 2 && <Description description={game?.description} />}
			<Options activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
		</div>
	)
}

export default GameMainBlock
