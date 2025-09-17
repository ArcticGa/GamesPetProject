import { Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout'
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
			</Route>
		</Routes>
	)
}

export default App
