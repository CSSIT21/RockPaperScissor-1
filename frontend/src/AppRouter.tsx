import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Home from './home/Home'

const AppRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default AppRouter
