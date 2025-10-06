import axios from 'axios'
import { SetStateAction } from 'react'
import { IFullGame, IReview, IUser } from '../types/types'

const BASE_URL = import.meta.env.VITE_GAMES_BASE_API_URL
const RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY
const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

export const fetchReviewsById = (
	userData: IUser,
	setLikedReviews: React.Dispatch<SetStateAction<IReview[]>>
) => {
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

	Promise.all(allTasks).then(result => setLikedReviews(result))
}

export const fetchGamesById = async (
	userData: IUser,
	setFeaturedGames: React.Dispatch<SetStateAction<IFullGame[]>>
) => {
	const featGames = userData.featuredGames

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

	const allTasks = featGames.map((gameId: number) => {
		return task(gameId)
	})

	Promise.all(allTasks).then(result => {
		setFeaturedGames(result)
	})
}
