import { Link } from 'react-router'
import CrownIcon from '../../../assets/icons/crown-icon.svg'
import { IAward, IGameYear } from '../../../types/types'

type GameYearProps = {
	award: IAward
	gamesYear: IGameYear[]
}

const GameYear = ({ award, gamesYear }: GameYearProps) => {
	const winnerGame = gamesYear.find(game => game.id === award.winnerId)

	return (
		winnerGame && (
			<Link
				to={'/gamesoftheyear'}
				className='flex justify-center items-center py-6 w-[32.5%] max-xl:w-full rounded-2xl border-1 border-main-background hover:border-links-and-borders cursor-pointe max-xl:mb-4'
				style={{
					backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${award.bgImage}')`,
				}}
			>
				<div>
					<div className='relative'>
						<img
							className='w-80 rounded-2xl mb-2.5 shadow'
							src={winnerGame.bigImageUrl}
							alt='game-image'
						/>
						{award.titleAward === 'Игра года' && (
							<img
								className='absolute -top-10 -right-10 w-20 rotate-40 max-sm:hidden'
								src={CrownIcon}
								alt='crown-icon'
							/>
						)}
					</div>

					<div className='text-center font-bold text-lg'>
						Премия: {award.titleAward}
					</div>
				</div>
			</Link>
		)
	)
}

export default GameYear
