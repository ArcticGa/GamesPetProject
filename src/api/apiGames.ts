import axios from 'axios'

const BASE_URL = import.meta.env.VITE_GAMES_BASE_API_URL
const RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY

export const getGames = async () => {
	try {
		const response = await axios.get(`${BASE_URL}`, {
			params: {
				platform: 'pc',
			},
			headers: {
				'x-rapidapi-key': `${RAPIDAPI_KEY}`,
				'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
			},
		})
		return response.data
	} catch (err) {
		console.log(err)
	}
}
