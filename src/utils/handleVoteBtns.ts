import { SetStateAction } from 'react'
import { fetchUpdateUser } from '../redux/slices/auth'
import { fetchUpdateReview } from '../redux/slices/dataSlices/gameReviewsSlice'
import { AppDispatch } from '../redux/store'
import { IReview } from '../types/types'

type Props = {
	liked: boolean
	setLiked: React.Dispatch<SetStateAction<boolean>>
	disliked: boolean
	setDisliked: React.Dispatch<SetStateAction<boolean>>
	setDisableBtns: React.Dispatch<SetStateAction<boolean>>
	data: IReview
	dispatch: AppDispatch
}

// ОСНОВНЫЕ ФУНКЦИИ
export const likeHandler = async ({
	liked,
	setLiked,
	disliked,
	setDisliked,
	setDisableBtns,
	data,
	dispatch,
}: Props) => {
	setDisableBtns(true)
	try {
		if (liked) {
			setLiked(false)
			await delLike(data, dispatch)
			return
		}

		if (disliked) {
			setDisliked(false)
			await delDislike(data, dispatch)
		}

		setLiked(true)
		await like(data, dispatch)
	} catch (error) {
		console.warn(error)
	} finally {
		setDisableBtns(false)
	}
}

export const dislikeHandler = async ({
	liked,
	setLiked,
	disliked,
	setDisliked,
	setDisableBtns,
	data,
	dispatch,
}: Props) => {
	setDisableBtns(true)
	try {
		if (disliked) {
			setDisliked(false)
			await delDislike(data, dispatch)
			return
		}

		if (liked) {
			setLiked(false)
			await delLike(data, dispatch)
		}

		setDisliked(true)
		await dislike(data, dispatch)
	} catch (error) {
		console.warn(error)
	} finally {
		setDisableBtns(false)
	}
}

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
export const like = async (data: IReview, dispatch: AppDispatch) => {
	await dispatch(fetchUpdateUser({ likedReviewId: data._id }))
	await dispatch(
		fetchUpdateReview({
			reviewId: data._id,
			updatedFields: {
				isLikePlus: 1,
			},
		})
	)
}

export const delLike = async (data: IReview, dispatch: AppDispatch) => {
	await dispatch(fetchUpdateUser({ delLikedReviewId: data._id }))
	await dispatch(
		fetchUpdateReview({
			reviewId: data._id,
			updatedFields: {
				isLikePlus: -1,
			},
		})
	)
}

export const dislike = async (data: IReview, dispatch: AppDispatch) => {
	await dispatch(fetchUpdateUser({ dislikedReviewId: data._id }))
	await dispatch(
		fetchUpdateReview({
			reviewId: data._id,
			updatedFields: {
				isDislikePlus: 1,
			},
		})
	)
}

export const delDislike = async (data: IReview, dispatch: AppDispatch) => {
	await dispatch(fetchUpdateUser({ delDislikedReviewId: data._id }))
	await dispatch(
		fetchUpdateReview({
			reviewId: data._id,
			updatedFields: {
				isDislikePlus: -1,
			},
		})
	)
}
