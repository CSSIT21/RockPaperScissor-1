import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Create from './create/Create'
import Finish from './finish/FInish'
import Game from './game/Game'
import Home from './home/Home'
import Join from './join/Join'
import Mode from './mode/Mode'

const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/mode" element={<Mode />} />
					<Route path="/create" element={<Create />} />
					<Route path="/join" element={<Join />} />
					<Route path="/game" element={<Game />} />
					<Route path="/finish" element={<Finish />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default AppRouter
