import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import MainLayout from './layouts/MainLayout'
import AuthPage from './pages/AuthPage'
import GamePage from './pages/GamePage'
import GamesOfYear from './pages/GamesOfYear'
import Home from './pages/Home'
import Recommendations from './pages/Recommendations'
import Reviews from './pages/ReviewsPage'
import SortedGamesByGenre from './pages/SortedGamesByGenre'
import { fetchAuthMe } from './redux/slices/auth'
import { setActiveLink } from './redux/slices/sidebarSlices/linksSlice'
import { useAppDispatch } from './redux/store'

function App() {
	const dispatch = useAppDispatch()
	const location = useLocation()

	useEffect(() => {
		dispatch(fetchAuthMe())
	}, [dispatch])

	useEffect(() => {
		dispatch(setActiveLink(location.pathname))
	}, [location, dispatch])

	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='recommendations' element={<Recommendations />} />
				<Route path='gamesoftheyear' element={<GamesOfYear />} />
				<Route path='game/:id' element={<GamePage />} />
				<Route path='game/:id/reviews' element={<Reviews />} />
				<Route path='sorted/:category' element={<SortedGamesByGenre />} />
				<Route path='auth' element={<AuthPage />} />
			</Route>
		</Routes>
	)
}

export default App
