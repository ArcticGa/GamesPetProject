import axios from 'axios'
import { SetStateAction } from 'react'
import { AppDispatch } from '../redux/store'

import { fetchUpdateUser } from '../redux/slices/auth'

import { setFeaturedGames } from '../redux/slices/featuredGamesSlice'
import { setLikedReviews } from '../redux/slices/likedReviewsSlice'
import { DevMsgFields, IFullGame, IReview, IUser } from '../types/types'

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_API_URL

// Конфигурация API для запросов на личный Backend (для Reviews)
const api = axios.create({
	baseURL: BASE_BACKEND_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Добавление Токена к каждому запросу
api.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

// Основная функция обработки ошибок
const handleError = (err: unknown, context: string) => {
	if (axios.isAxiosError(err)) {
		console.error(
			`[${context}] AxiosError: ${err.response?.status || ''} ${err.message}`
		)
	} else {
		console.error(`[${context}]`, err)
	}
}

// Функция отправки сообщения пользователя на Backend
export const fetchPostDevMsg = async (fields: DevMsgFields) => {
	try {
		const { data } = await axios.post(`/for-developer`, fields)
		return data
	} catch (error) {
		handleError(error, 'fetchPostDevMsg')
	}
}

// Функция отправки изображения на сервис Cloudinary
export const fetchImage = async (files: FileList, dispatch: AppDispatch) => {
	try {
		const formData = new FormData()
		const selectedFile = files[0]
		formData.append('file', selectedFile)
		formData.append('upload_preset', 'games-world-static')
		formData.append('cloud_name', 'duungkc2k')

		const { data } = await axios.post(
			`https://api.cloudinary.com/v1_1/duungkc2k/image/upload`,
			formData
		)

		dispatch(fetchUpdateUser({ avatarUrl: data.secure_url }))
		return
	} catch (err) {
		handleError(err, 'fetchImage')
	}
}

// Универсальная функция (helper) для загрузки множества элементов
async function fetchItemsById<T, ID extends string | number>(
	ids: ID[],
	fetcher: (id: ID) => Promise<T | undefined>
): Promise<T[]> {
	try {
		const result = await Promise.all(ids.map(fetcher))
		return result.filter(Boolean) as T[]
	} catch (error) {
		handleError(error, 'fetchItemsById')
		return []
	}
}

// Функция для запроса залайканых обзоров авторизованного юзера
export const fetchLikedReviewsById = async (
	userData: IUser,
	dispatch: AppDispatch
) => {
	try {
		const fetchReview = async (id: string) => {
			const { data } = await api.get<IReview>(`/reviews/${id}`)
			return data
		}

		const reviews = await fetchItemsById(userData.likedReviews, fetchReview)
		dispatch(setLikedReviews(reviews))
	} catch (error) {
		handleError(error, 'fetchLikedReviewsById')
	}
}

// Функция для запроса избранных игр авторизованного юзера
export const fetchFeaturedGamesById = async (
	userData: IUser,
	dispatch: AppDispatch
) => {
	try {
		const fetchGame = async (id: number) => {
			const { data } = await axios.get<IFullGame>('/api/games/getOne', {
				params: { id },
			})

			return data
		}

		const result = await fetchItemsById(userData.featuredGames, fetchGame)
		dispatch(setFeaturedGames(result))
	} catch (error) {
		handleError(error, 'fetchGame')
	}
}

// Функция для запроса залайканых обзоров стороннего юзера
export const fetchLikedReviewsForOutsider = async (
	object: IUser,
	setStateAction: React.Dispatch<SetStateAction<IReview[]>>
) => {
	try {
		const fetchReview = async (id: string) => {
			const { data } = await api.get<IReview>(`/review/${id}`)
			return data
		}

		const reviews = await fetchItemsById(object.likedReviews, fetchReview)
		setStateAction(reviews)
	} catch (error) {
		handleError(error, 'fetchLikedReviewsForOutsider')
	}
}

// Функция для запроса избранных игр стороннего юзера
export const fetchFeaturedGamesForOutsider = async (
	object: IUser,
	setStateAction: React.Dispatch<SetStateAction<IFullGame[]>>
) => {
	try {
		const fetchGame = async (id: number) => {
			const { data } = await axios.get<IFullGame>('/games/getOne', {
				params: { id },
			})
			return data
		}
		const games = await fetchItemsById(object.featuredGames, fetchGame)
		setStateAction(games)
	} catch (error) {
		handleError(error, 'fetchFeaturedGamesForOutsider')
	}
}
