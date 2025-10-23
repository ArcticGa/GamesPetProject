import { useEffect, useState } from 'react'
import DislikeIcon from '../../../../assets/icons/thumbs-down.svg'
import LikeIcon from '../../../../assets/icons/thumbs-up.svg'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'
import { IReview } from '../../../../types/types'
import { dislikeHandler, likeHandler } from '../../../../utils/handleVoteBtns'

const VoteBtns = ({ data }: { data: IReview }) => {
	const dispatch = useAppDispatch()
	const { userData } = useAppSelector(state => state.authSlice)

	const [liked, setLiked] = useState(false)
	const [disliked, setDisliked] = useState(false)

	const voteProps = { liked, setLiked, disliked, setDisliked, data, dispatch }

	useEffect(() => {
		if (userData) {
			const isLiked = Boolean(
				userData.likedReviews.find(item => item === data._id)
			)
			const isDisliked = Boolean(
				userData.dislikedReviews.find(item => item === data._id)
			)
			setLiked(isLiked)
			setDisliked(isDisliked)
		}
	}, [userData, data])

	return (
		<div className='flex text-nowrap'>
			<div
				onClick={() => likeHandler(voteProps)}
				className={`${
					liked ? 'bg-green-700' : 'bg-main-background'
				} flex items-center rounded-lg px-4 py-1.5 cursor-pointer max-sm:px-2`}
			>
				<img className='w-5 max-sm:w-4' src={LikeIcon} alt='like-icon' />
				<div className='ml-2 text-sm max-sm:text-xs'>Да ({data.likes})</div>
			</div>
			<div
				onClick={() => dislikeHandler(voteProps)}
				className={`${
					disliked ? 'bg-red-700' : 'bg-main-background'
				} flex items-center ml-2 rounded-lg px-4 py-1.5 cursor-pointer max-sm:px-2`}
			>
				<img className='w-5 max-sm:w-4' src={DislikeIcon} alt='dislike-icon' />
				<div className='ml-2 text-sm max-sm:text-xs'>Нет ({data.dislikes})</div>
			</div>
		</div>
	)
}

export default VoteBtns
