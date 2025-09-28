import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout'
import AuthPage from './pages/AuthPage'
import GamePage from './pages/GamePage'
import GamesOfYear from './pages/GamesOfYear'
import Home from './pages/Home'
import Recommendations from './pages/Recommendations'
import Reviews from './pages/ReviewsPage'
import { fetchAuthMe } from './redux/slices/auth'
import { useAppDispatch } from './redux/store'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const token = localStorage.getItem('token')
		dispatch(fetchAuthMe(token))
	}, [])

	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='recommendations' element={<Recommendations />} />
				<Route path='gamesoftheyear' element={<GamesOfYear />} />
				<Route path='game/:id' element={<GamePage />} />
				<Route path='game/:id/reviews' element={<Reviews />} />
				<Route path='auth' element={<AuthPage />} />
			</Route>
		</Routes>
	)
}

export default App
