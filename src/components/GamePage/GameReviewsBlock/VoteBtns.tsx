import { useEffect, useState } from 'react'
import DislikeIcon from '../../../assets/icons/thumbs-down.svg'
import LikeIcon from '../../../assets/icons/thumbs-up.svg'
import { fetchUpdateUser } from '../../../redux/slices/auth'
import { fetchUpdateReview } from '../../../redux/slices/dataSlices/gameReviewsSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { IReview } from '../../../types/types'

const VoteBtns = ({ data }: { data: IReview }) => {
	const dispatch = useAppDispatch()
	const { userData } = useAppSelector(state => state.authSlice)

	const [liked, setLiked] = useState(false)
	const [disliked, setDisliked] = useState(false)

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

	const likeHandler = () => {
		if (liked) {
			setLiked(false)
			dispatch(fetchUpdateUser({ delLikedReviewId: data._id }))
			dispatch(
				fetchUpdateReview({
					reviewId: data._id,
					updatedFields: {
						isLikePlus: -1,
					},
				})
			)

			return
		}

		if (disliked) {
			setDisliked(false)
			dispatch(fetchUpdateUser({ delDislikedReviewId: data._id }))
			dispatch(
				fetchUpdateReview({
					reviewId: data._id,
					updatedFields: {
						isDislikePlus: -1,
					},
				})
			)
		}

		setLiked(true)
		dispatch(fetchUpdateUser({ likedReviewId: data._id }))
		dispatch(
			fetchUpdateReview({
				reviewId: data._id,
				updatedFields: {
					isLikePlus: 1,
				},
			})
		)
	}

	const dislikeHandler = () => {
		if (disliked) {
			setDisliked(false)
			dispatch(fetchUpdateUser({ delDislikedReviewId: data._id }))
			dispatch(
				fetchUpdateReview({
					reviewId: data._id,
					updatedFields: {
						isDislikePlus: -1,
					},
				})
			)

			return
		}

		if (liked) {
			setLiked(false)
			dispatch(fetchUpdateUser({ delLikedReviewId: data._id }))
			dispatch(
				fetchUpdateReview({
					reviewId: data._id,
					updatedFields: {
						isLikePlus: -1,
					},
				})
			)
		}

		setDisliked(true)
		dispatch(fetchUpdateUser({ dislikedReviewId: data._id }))
		dispatch(
			fetchUpdateReview({
				reviewId: data._id,
				updatedFields: {
					isDislikePlus: 1,
				},
			})
		)
	}

	return (
		<div className='flex'>
			<div
				onClick={likeHandler}
				className={`${
					liked ? 'bg-green-700' : 'bg-main-background'
				} flex items-center  rounded-lg px-4 py-1.5 mr-1 cursor-pointer`}
			>
				<img className='w-5' src={LikeIcon} alt='like-icon' />
				<div className='ml-2 text-sm'>Да ({data.likes})</div>
			</div>
			<div
				onClick={dislikeHandler}
				className={`${
					disliked ? 'bg-red-700' : 'bg-main-background'
				} flex items-center  rounded-lg px-4 py-1.5 cursor-pointer`}
			>
				<img className='w-5' src={DislikeIcon} alt='dislike-icon' />
				<div className='ml-2 text-sm'>Нет ({data.dislikes})</div>
			</div>
		</div>
	)
}

export default VoteBtns
