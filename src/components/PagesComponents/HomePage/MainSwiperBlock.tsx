import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useAppSelector } from '../../../redux/store'
import { IGame } from '../../../types/types'
import { changeSlidesPerView } from '../../../utils/changeSlidesPerView'
import { getRandomGames } from '../../../utils/getRandomItems'

const MainSwiperBlock = () => {
	const { games } = useAppSelector(state => state.gamesSlice)
	const [randomGames, setRandomGames] = useState<IGame[]>([])

	useEffect(() => {
		if (games) {
			setRandomGames(getRandomGames(games, 30))
		}
	}, [games])

	return (
		<Swiper
			modules={[Pagination, Autoplay]}
			spaceBetween={15}
			slidesPerView={changeSlidesPerView()}
			grabCursor
			loop
			navigation
			centeredSlides={true}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			pagination={{
				dynamicBullets: true,
			}}
		>
			{randomGames.map(game => (
				<SwiperSlide key={game.id}>
					<Link to={`/game/${game.id}`}>
						<img
							className='rounded-xl'
							src={`/api/image?url=${encodeURIComponent(game.thumbnail)}`}
							alt='game-img'
						/>
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default MainSwiperBlock
