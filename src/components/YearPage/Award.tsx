import { useEffect, useState } from 'react'
import CrownIcon from '../../assets/icons/crown-icon.svg'
import { IAward, IGameYear } from '../../types/types'
import Finalist from './Finalist'

interface IAwardProps {
	data: IAward
	gamesYear: IGameYear[]
}

const Award = ({ data, gamesYear }: IAwardProps) => {
	const [openFinalists, setOpenFinalists] = useState(false)
	const [winner, setWinner] = useState<IGameYear>()
	const [finalists, setFinalists] = useState<IGameYear[]>()

	const getWiningGame = () => {
		const winingGame = gamesYear.find(item => item.id === data.winnerId)
		if (winingGame === undefined) return
		setWinner(winingGame)
	}

	const getFinalists = () => {
		const finalists: IGameYear[] = []
		gamesYear.forEach(game => {
			const searched = game.awardIds.find(item => item === data.id)
			if (searched !== undefined) finalists.push(game)
		})

		setFinalists(finalists)
	}

	useEffect(() => {
		getWiningGame()
		getFinalists()
	}, [gamesYear])

	return !winner ? (
		<div>Что-то пошло не так :(</div>
	) : (
		<div className='w-[1061px]'>
			<div
				className='p-10 rounded-2xl mb-5'
				style={{
					backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${data.bgImage}')`,
				}}
			>
				<div className='flex justify-between '>
					<div className='flex flex-col items-start'>
						<div className='text-lg max-w-[350px]'>
							Премия «{data.titleAward}»
						</div>
						<div className='text-3xl font-bold py-2 pb-3'>{winner.name}</div>
						<div className='max-w-[385px] flex-1 text-sm text-[#d7d7d7]'>
							{winner.description}
						</div>
						<div
							onClick={() => setOpenFinalists(!openFinalists)}
							className='cursor-pointer font-bold px-6 py-2 bg-game-year-button rounded-2xl'
						>
							Финалисты
						</div>
					</div>
					<div className='relative rounded-2xl shadow-md'>
						<img
							className='w-[500px] rounded-2xl'
							src={winner.bigImageUrl}
							alt='winner-image'
						/>
						{data.id === 1 && (
							<img
								className='absolute -top-10 -right-10 rotate-45 w-20'
								src={CrownIcon}
								alt='crown-icon'
							/>
						)}
					</div>
				</div>
				{openFinalists && (
					<div className='mt-6'>
						<div className='flex items-center mb-3'>
							<div className='mr-2'>Финалисты:</div>
							<hr className='w-full' />
						</div>
						<div className='flex items-center justify-between'>
							{finalists?.map(finalist => (
								<Finalist key={finalist.id} finalist={finalist} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Award
