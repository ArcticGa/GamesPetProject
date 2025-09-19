import { Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout'
import GamePage from './pages/GamePage'
import GamesOfYear from './pages/GamesOfYear'
import Home from './pages/Home'
import Recommendations from './pages/Recommendations'

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='recommendations' element={<Recommendations />} />
				<Route path='gamesoftheyear' element={<GamesOfYear />} />
				<Route path='game/:id' element={<GamePage />} />
			</Route>
		</Routes>
	)
}

export default App
