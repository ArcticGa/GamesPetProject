import CrownIcon from '../../../assets/icons/crown-icon.svg'
import { IGameYear } from '../../../types/types'
import { awardsList } from '../../../utils/miniArraysList'
import GameYear from './GameYear'

const GamesYear = ({ gamesYear }: { gamesYear: IGameYear[] }) => {
	return (
		<div className='mb-10'>
			<div className='flex items-center justify-between mb-4'>
				<div className='flex items-center text-xl text-[#f7b62a]'>
					Игры года: 2024
					<img
						className='w-10 rotate-25 ml-2'
						src={CrownIcon}
						alt='crown-icon'
					/>
				</div>
			</div>
			<div className='flex justify-between max-xl:flex-col max-xl:items-center'>
				{awardsList.slice(0, 3).map(award => (
					<GameYear key={award.id} award={award} gamesYear={gamesYear} />
				))}
			</div>
		</div>
	)
}

export default GamesYear
