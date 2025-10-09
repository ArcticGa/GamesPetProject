import { Link } from 'react-router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IGame } from '../../types/types'

type GamesBlockProps = {
	array: IGame[] | string[]
	titleBlock: string
	type: 'games' | 'genres'
}

const GamesBlock = ({ array, titleBlock, type }: GamesBlockProps) => {
	return (
		<div className='mb-10'>
			<div className='mb-4 text-xl'>{titleBlock}</div>
			<Swiper
				className='!p-0 !m-0'
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
								className='h-[150px] bg-main-blocks mr-2 flex items-center justify-center text-xl font-bold rounded-xl'
							>
								{item}
							</Link>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	)
}

export default GamesBlock
