import { FC, SetStateAction, useEffect, useState } from 'react'
import HeartIcon from '../../../../assets/icons/heart.svg'
import InfoIcon from '../../../../assets/icons/info-icon.svg'
import PictureIcon from '../../../../assets/icons/picture-icon.svg'
import RedHeartIcon from '../../../../assets/icons/redHeart.svg'
import { fetchUpdateUser } from '../../../../redux/slices/auth'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'
import { IFullGame } from '../../../../types/types'

interface IOptionsProps {
	game: IFullGame
	activeBtn: number
	setActiveBtn: React.Dispatch<SetStateAction<number>>
}

const Options: FC<IOptionsProps> = ({ game, activeBtn, setActiveBtn }) => {
	const dispatch = useAppDispatch()
	const { userData } = useAppSelector(state => state.authSlice)
	const [isLiked, setIsLiked] = useState(false)

	useEffect(() => {
		if (userData) {
			userData.featuredGames.forEach(gameId => {
				if (gameId === game.id) {
					return setIsLiked(true)
				}
			})
		} else {
			setIsLiked(false)
		}
	}, [userData])

	const handleLike = () => {
		setIsLiked(!isLiked)

		if (!isLiked) {
			dispatch(fetchUpdateUser({ addGameId: game.id }))
		} else {
			dispatch(fetchUpdateUser({ removeGameId: game.id }))
		}
	}

	return (
		<div className='max-2xl:absolute top-0 left-0'>
			{userData && (
				<div
					onClick={handleLike}
					className={`${
						isLiked ? 'border-youtube-link' : 'border-main-background'
					} bg-main-blocks border-4  py-4 px-4 flex flex-col items-center rounded-full mb-4 cursor-pointer`}
				>
					<img
						className='w-5'
						src={!isLiked ? HeartIcon : RedHeartIcon}
						alt='heart-icon'
					/>
				</div>
			)}

			<div className='bg-main-blocks border-1 border-links-and-borders py-4 px-2 flex flex-col items-center rounded-full max-2xl:hidden'>
				<img
					onClick={() => setActiveBtn(1)}
					className={`${
						activeBtn === 1 && 'bg-main-buttons'
					} p-2 mb-4  rounded-full cursor-pointer`}
					src={PictureIcon}
					alt='bg-picture'
				/>
				<img
					onClick={() => setActiveBtn(2)}
					className={`${
						activeBtn === 2 && 'bg-main-buttons'
					} p-2 rounded-full cursor-pointer`}
					src={InfoIcon}
					alt='bg-picture'
				/>
			</div>
		</div>
	)
}

export default Options
