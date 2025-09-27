import { Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout'
import AuthPage from './pages/AuthPage'
import GamePage from './pages/GamePage'
import GamesOfYear from './pages/GamesOfYear'
import Home from './pages/Home'
import Recommendations from './pages/Recommendations'
import Reviews from './pages/ReviewsPage'

function App() {
	// const dispatch = useAppDispatch()

	// useEffect(() => {
	// 	localStorage.setItem(
	// 		'token',
	// 		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGQ3OWZjMjBlZDgwY2VmMmYwNzZiZTEiLCJpYXQiOjE3NTg5Njg5ODQsImV4cCI6MTc2MTU2MDk4NH0.8w06VZjlmnm54vhLPTY8D9FozhcPDOQTmC7s6FAwZa8'
	// 	)

	// 	// const params = {
	// 	// 	email: 'aboba@mail.ru',
	// 	// 	password: 'monkerge',
	// 	// }
	// 	// dispatch(fetchAuth(params))

	// 	dispatch(fetchAuthMe())
	// }, [])

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
