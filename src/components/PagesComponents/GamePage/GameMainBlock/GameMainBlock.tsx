import { useEffect, useState } from 'react'
import { IFullGame } from '../../../../types/types'
import { addGameToViewedArray } from '../../../../utils/addGameToViewedArray'
import { getRandomScreenshot } from '../../../../utils/getRandomItems'
import Description from './Description'
import Info from './Info'
import Options from './Options'

const GameMainBlock = ({ game }: { game: IFullGame }) => {
	const [activeBtn, setActiveBtn] = useState(2)
	const [randomScreenshot, setRandomScreenshot] = useState<string | undefined>(
		''
	)

	useEffect(() => {
		setRandomScreenshot(getRandomScreenshot(game))
		addGameToViewedArray(game)
	}, [])

	return (
		<div
			className='relative bg-main-blocks w-full rounded-3xl pl-[50px] pr-[20px] flex items-center justify-between flex-wrap py-10 max-2xl:p-4'
			style={{
				backgroundImage: `linear-gradient(rgba(0,0,0,${
					activeBtn === 2 ? '0.7' : '0.2'
				}), rgba(0,0,0,${
					activeBtn === 2 ? '0.7' : '0.2'
				})), url('${`/api/image?url=${encodeURIComponent(
					randomScreenshot ? randomScreenshot : ''
				)}`}}')`,
			}}
		>
			<div className='max-xl:'>
				<img
					className='w-80 rounded-t-lg'
					src={`/api/image?url=${encodeURIComponent(game.thumbnail)}`}
					alt='game-img'
				/>
				<div className='max-xl2:mb-4'>
					<div className='text-2xl max-w-80 mb-3 text-center font-bold bg-main-background border-1 border-t-0 border-links-and-borders p-1 rounded-b-lg'>
						{game.title}
					</div>
				</div>

				<Info title='Разработчик:' info={game.developer} />
				<Info title='Издатель:' info={game.publisher} />
				<Info title='Дата выхода:' info={game.release_date} />
				<Info title='Жанр:' info={game.genre} />

				<div className='mt-7 max-2xl:mb-6'>
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
			<Options game={game} activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
		</div>
	)
}

export default GameMainBlock
