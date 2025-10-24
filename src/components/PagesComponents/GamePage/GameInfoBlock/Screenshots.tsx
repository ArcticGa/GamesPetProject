import { useState } from 'react'
import { useAppSelector } from '../../../../redux/store'

const Screenshots = () => {
	const { game } = useAppSelector(state => state.gameByIdSlice)
	const [activeImg, setActiveImg] = useState(0)

	return game ? (
		<div>
			<div className='text-xl font-bold mb-3'>Скриншоты из игры</div>
			<div className='mb-4 max-w-170'>
				{game.screenshots.length !== 0 ? (
					<img
						className='rounded-lg'
						src={game.screenshots[activeImg].image}
						alt='image-game'
					/>
				) : (
					<div>Скриншотов нет</div>
				)}
			</div>
			<div className='flex items-center justify-evenly flex-wrap'>
				{game?.screenshots?.map((screen, index) => (
					<img
						key={screen.id}
						onClick={() => setActiveImg(index)}
						className={` ${
							activeImg !== index && 'opacity-20'
						} cursor-pointer max-w-35 w-full rounded-lg`}
						src={screen.image}
						alt='screenshot'
					/>
				))}
			</div>
		</div>
	) : (
		<div>
			Ошибка (Если ваш IP Российский, советую включить VPN, или использовать
			прокси)
		</div>
	)
}

export default Screenshots
