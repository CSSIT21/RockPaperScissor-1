import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './create/Create';
import Finish from './finish/Finish';
import Game from './game/Game';
import Home from './home/Home';
import Join from './join/Join';
import Mode from './mode/Mode';
import Rtc from './rtc/Rtc';

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
					<Route path="/rtc" element={<Rtc />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default AppRouter;
