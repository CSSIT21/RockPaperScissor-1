import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { caller, useAxios } from '../_utils/api';
import NameField from '../_components/NameField';
import StartButton from '../_components/Button';
import styles from './Home.module.scss';
import Logo from '../_assets/artwork/logo.png';

const Home = () => {
	const navigate = useNavigate();
	const axios = useAxios();
	const [mode, setMode] = React.useState<null | 'choosing' | 'joining' | 'loading'>(null);
	const [name, setName] = React.useState<string | null>(null);
	const [pin, setPin] = React.useState<string | null>(null);

	const confirmName = () => {
		if (name) {
			setMode('choosing');
		}
	};

	const join = () => {
		setMode('loading');
		caller<any>(
			axios.post(
				`/player/join`,
				{
					name,
					pin,
				},
			),
		).then((res) => {
			sessionStorage.setItem('token', res.data.token);
			navigate('/game', { state: { name: res.data.name, pin: res.data.pin } });
		});
	};

	const create = () => {
		setMode('loading');
		caller<any>(
			axios.post(
				`/player/create`,
				{
					name,
				},
			),
		).then((res) => {
			sessionStorage.setItem('token', res.data.token);
			navigate('/game', { state: { name: res.data.name, pin: res.data.pin } });
		});
	};

	return (
		<div className={styles.home}>
			<div className={styles.colLeft}></div>
			<div className={styles.colRight}>
				<img src={Logo} width="250px" className={styles.image} />
				<Typography variant="h4" sx={{ marginTop: 4, marginBottom: 20, fontFamily: 'Righteous' }}>
					RPS Online
				</Typography>
				{
					mode === null ?
						<>
							<Box width="calc(100% - 128px)">
								<NameField label="Enter your name" setValue={setName} />
								<StartButton onClick={confirmName}>Start</StartButton>
							</Box>
						</>
						: mode === 'choosing' ?
							<Box width="100%" maxWidth="300px">
								<Typography variant="h5" textAlign="center" gutterBottom>
									Welcome, {name}!
								</Typography>
								<StartButton onClick={() => setMode('joining')}>Join Room By Code</StartButton>
								<StartButton onClick={create}>Create Room</StartButton>
							</Box> :
							mode === 'joining' ?
								<Box width="100%" maxWidth="300px">
									<Typography variant="h5" textAlign="center" gutterBottom>
										Join Room
									</Typography>
									<NameField label="Enter PIN code" setValue={setPin} />
									<StartButton onClick={join}>Join</StartButton>
								</Box> :
								<CircularProgress />

				}
			</div>
		</div>
	);
};

export default Home;
