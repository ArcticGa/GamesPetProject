import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { fetchFeaturedGamesById, fetchLikedReviewsById } from './api/fetchData'
import MainLayout from './layouts/MainLayout'
import AuthPage from './pages/AuthPage'
import ForDeveloper from './pages/ForDeveloper'
import GamePage from './pages/GamePage'
import GamesOfYear from './pages/GamesOfYear'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Recommendations from './pages/Recommendations'
import Reviews from './pages/ReviewsPage'
import SortedGamesByGenre from './pages/SortedGamesByGenre'
import UserPage from './pages/UserPage'
import UserProfilePage from './pages/UserProfilePage'
import { fetchAuthMe } from './redux/slices/auth'
import { setActiveLink } from './redux/slices/sidebarSlices/linksSlice'
import { useAppDispatch, useAppSelector } from './redux/store'

function App() {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const { userData } = useAppSelector(state => state.authSlice)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			dispatch(fetchAuthMe())
		}
	}, [dispatch])

	useEffect(() => {
		if (userData) {
			fetchLikedReviewsById(userData, dispatch)
			fetchFeaturedGamesById(userData, dispatch)
		}
	}, [userData, dispatch])

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
				<Route path='profile' element={<UserProfilePage />} />
				<Route path='user/:userId' element={<UserPage />} />
				<Route path='for-developer' element={<ForDeveloper />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
