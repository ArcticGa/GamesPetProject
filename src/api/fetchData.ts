import axios from 'axios'
import { SetStateAction } from 'react'
import { fetchUpdateUser } from '../redux/slices/auth'
import { setFeaturedGames } from '../redux/slices/featuredGamesSlice'
import { setLikedReviews } from '../redux/slices/likedReviewsSlice'
import { IFullGame, IReview, IUser } from '../types/types'

type DevMsgFields = {
	text: string
}

const BASE_URL = import.meta.env.VITE_GAMES_BASE_API_URL
const RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY
const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

export const fetchPostDevMsg = async (fields: DevMsgFields) => {
	try {
		const { data } = await axios.post(
			`${BASE_BACKEND_URL}/for-developer`,
			fields,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		)

		return data
	} catch (error) {
		console.warn(error)
	}
}

export const fetchImage = async (files: FileList, dispatch: any) => {
	try {
		const formData = new FormData()
		const selectedFile = files[0]
		formData.append('image', selectedFile)
		const { data } = await axios.post(`${BASE_BACKEND_URL}/uploads`, formData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		dispatch(fetchUpdateUser({ avatarUrl: data }))
		return
	} catch (err) {
		console.warn(err)
	}
}

export const fetchLikedReviewsById = (userData: IUser, dispatch: any) => {
	const likedReviews = userData.likedReviews

	const task = async (id: string) => {
		try {
			const { data } = await axios.get(`${BASE_BACKEND_URL}/review/${id}`)

			return data
		} catch (err) {
			console.log('error', err)
		}
	}

	const allTasks = likedReviews.map((reviewId: string) => {
		return task(reviewId)
	})

	Promise.all(allTasks).then(result => dispatch(setLikedReviews(result)))
}

export const fetchFeaturedGamesById = async (
	userData: IUser,
	dispatch: any
) => {
	const task = async (id: number) => {
		try {
			const response = await axios.get(`${BASE_URL}/game`, {
				params: { id },
				headers: {
					'x-rapidapi-key': `${RAPIDAPI_KEY}`,
					'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
				},
			})

			return response.data
		} catch (err) {
			console.log('error', err)
		}
	}

	const allTasks = userData.featuredGames.map((gameId: number) => {
		return task(gameId)
	})

	Promise.all(allTasks).then(result => {
		dispatch(setFeaturedGames(result))
	})
}

export const fetchLikedReviewsForOutsider = (
	object: IUser,
	setStateAction: React.Dispatch<SetStateAction<IReview[]>>
) => {
	const task = async (id: string) => {
		try {
			const { data } = await axios.get(`${BASE_BACKEND_URL}/review/${id}`)

			return data
		} catch (err) {
			console.log('error', err)
		}
	}

	const allTasks = object.likedReviews.map((reviewId: string) => {
		return task(reviewId)
	})

	Promise.all(allTasks).then(result => setStateAction(result))
}

export const fetchFeaturedGamesForOutsider = (
	object: IUser,
	setStateAction: React.Dispatch<SetStateAction<IFullGame[]>>
) => {
	const task = async (id: number) => {
		try {
			const response = await axios.get(`${BASE_URL}/game`, {
				params: { id },
				headers: {
					'x-rapidapi-key': `${RAPIDAPI_KEY}`,
					'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
				},
			})

			return response.data
		} catch (err) {
			console.log('error', err)
		}
	}

	const allTasks = object.featuredGames.map((gameId: number) => {
		return task(gameId)
	})

	Promise.all(allTasks).then(result => setStateAction(result))
}
