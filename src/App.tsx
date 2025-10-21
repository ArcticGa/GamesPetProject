import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import MainLayout from './layouts/MainLayout'
import AuthPage from './pages/AuthPage'
import ForDeveloper from './pages/ForDeveloper'
import GamePage from './pages/GamePage'
import GamesOfYear from './pages/GamesOfYear'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Recommendations from './pages/Recommendations'
import Reviews from './pages/ReviewsPage'
import SortingGamesPage from './pages/SortingGamesPage'
import UserPage from './pages/UserPage'
import UserProfilePage from './pages/UserProfilePage'
import { fetchAuthMe, setAuthStatus, Status } from './redux/slices/auth'
import { setActiveLink } from './redux/slices/sidebarSlices/linksSlice'
import { useAppDispatch } from './redux/store'

function App() {
	const dispatch = useAppDispatch()
	const location = useLocation()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			dispatch(fetchAuthMe())
		} else {
			dispatch(setAuthStatus(Status.SUCCESS))
		}
	}, [])

	useEffect(() => {
		dispatch(setActiveLink(location.pathname))
	}, [location])

	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='recommendations' element={<Recommendations />} />
				<Route path='sorting' element={<SortingGamesPage />} />
				<Route path='gamesoftheyear' element={<GamesOfYear />} />
				<Route path='game/:id' element={<GamePage />} />
				<Route path='game/:id/reviews' element={<Reviews />} />
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
