import { SetStateAction } from 'react'
import { fetchUpdateUser } from '../redux/slices/auth'
import { fetchUpdateReview } from '../redux/slices/dataSlices/gameReviewsSlice'
import { IReview } from '../types/types'

type Props = {
	liked: boolean
	setLiked: React.Dispatch<SetStateAction<boolean>>
	disliked: boolean
	setDisliked: React.Dispatch<SetStateAction<boolean>>
	data: IReview
	dispatch: any
}

// ОСНОВНЫЕ ФУНКЦИИ
export const likeHandler = ({
	liked,
	setLiked,
	disliked,
	setDisliked,
	data,
	dispatch,
}: Props) => {
	if (liked) {
		setLiked(false)
		delLike(data, dispatch)
		return
	}

	if (disliked) {
		setDisliked(false)
		delDislike(data, dispatch)
	}

	setLiked(true)
	like(data, dispatch)
}

export const dislikeHandler = ({
	liked,
	setLiked,
	disliked,
	setDisliked,
	data,
	dispatch,
}: Props) => {
	if (disliked) {
		setDisliked(false)
		delDislike(data, dispatch)
		return
	}

	if (liked) {
		setLiked(false)
		delLike(data, dispatch)
	}

	setDisliked(true)
	dislike(data, dispatch)
}

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
export const like = (data: IReview, dispatch: any) => {
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

export const delLike = (data: IReview, dispatch: any) => {
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

export const dislike = (data: IReview, dispatch: any) => {
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

export const delDislike = (data: IReview, dispatch: any) => {
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
