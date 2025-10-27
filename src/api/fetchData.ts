import axios from 'axios'
import { SetStateAction } from 'react'

import { fetchUpdateUser } from '../redux/slices/auth'
import { setFeaturedGames } from '../redux/slices/featuredGamesSlice'
import { setLikedReviews } from '../redux/slices/likedReviewsSlice'
import { IFullGame, IReview, IUser } from '../types/types'

type DevMsgFields = {
	text: string
}

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
		console.warn(err)
	}
}

// Последующий код может показаться ужасным и это так.
// 4 почти одинаковые функции возвращающие Promise.all()
// Эти функции используются в файлах UserPage.tsx (личная страница пользователя) и UserProfilePage.tsx (страница стороннего пользователя) и каждая из них должна получить и Понравившиеся и Созданные обзоры по reviewsId которые хранятся у самого пользователя в базе в виде массивов айдишников (по факту отрисовки страницы происходит КУЧА запросов на сервак в виде "Дай мне один Обзор по reviewId". А их может быть бесконечное множество)
// Если у пользователя будет много созданных обзоров или понравившихся или и то и то, мой сервак просто умрет. Я это понимаю :(
//Вся проблема кроется в моем бэкенде (ну и то что список Игр и Обзоров приходят с разных источников) .Это крайняя мера, так как бэкенд писал тоже я и он совсем плох.

// ВЫВОД: РАЗРАБ НЕ ОПЫТНЫЙ, ПРОЕКТ НЕ ПОДХОДИТ ДЛЯ БОЛЬШОГО КОЛИЧЕСТВА ОНЛАЙН ПОЛЬЗОВАТЕЛЕЙ В МОМЕНТЕ. Проект является примером того, что я умею и могу.
// ---------- СПАСИБО ЗА ПОНИМАНИЕ ---------- //

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
			const response = await axios.get(`/api/games/getOne`, {
				params: { id },
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
			const response = await axios.get(`/api/games/getOne`, {
				params: { id },
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
