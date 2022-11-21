import React, { useEffect, useRef } from 'react';
import { Box, Button, Card, CircularProgress, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import stat from '../_components/Stat';
import { newPeerConnection } from '../_utils/rtc';
import { backend, caller, useAxios } from '../_utils/api';
import Stat from '../_components/Stat';

import styles from './Game.module.scss';
import ImgVs from '../_assets/artwork/vs.png';

const Game = () => {
	const axios = useAxios();
	const [state, setState] = React.useState<any>({
		me: 1,
		room: {
			countdown: -2,
			pin: '000000',
			player1: null,
			player2: null,
			rounds: null,
		},
	});
	const video = useRef<HTMLVideoElement>(null);
	const video2 = useRef<HTMLVideoElement>(null);
	const ws = useRef<any>(null);

	const startGame = () => {
		caller<any>(
			axios.delete(`/game/start`),
		).then((res) => {

		});
	};

	const startCamera = () => {
		const pc = newPeerConnection();
		pc.oniceconnectionstatechange = (e) => console.log('[sender rtc] ' + pc.iceConnectionState);
		pc.onicecandidate = (event) => {
			if (event.candidate === null) {
				caller<any>(
					axios.post(
						`/rtc/offer/sender`,
						{
							description: window.btoa(JSON.stringify(pc.localDescription)),
						},
					),
				).then((res) => {
					try {
						pc.setRemoteDescription(JSON.parse(window.atob(res.data.answer))).then(void (0));
					} catch (e) {
						alert(e);
					}
				});
			}
		};

		navigator.mediaDevices.getUserMedia({ video: true, audio: false })
			.then((stream) => {
				stream.getTracks().forEach(track => pc.addTrack(track, stream));
				video.current!.srcObject = stream;
				pc.createOffer()
					.then((d) => pc.setLocalDescription(d))
					.catch(() => console.log('error'));
			});
	};

	const receiveCamera = () => {
		const pc = newPeerConnection();
		pc.oniceconnectionstatechange = e => console.log('[receiver rtc] ' + pc.iceConnectionState);
		pc.onicecandidate = (event) => {
			if (event.candidate === null) {
				caller<any>(
					axios.post(
						`/rtc/offer/receiver`,
						{
							description: btoa(JSON.stringify(pc.localDescription)),
						},
					),
				).then((res) => {
					try {
						pc.setRemoteDescription(JSON.parse(window.atob(res.data.answer))).then(void (0));
					} catch (e) {
						alert(e);
					}
				});
			}
		};

		pc.addTransceiver('video');
		pc.createOffer()
			.then(d => pc.setLocalDescription(d))
			.catch((err) => console.log(err));

		pc.ontrack = function (event) {
			video2.current!.srcObject = event.streams[0];
			video2.current!.autoplay = true;
			video2.current!.controls = true;
		};
	};

	const startWebSocket = () => {
		ws.current = new WebSocket('wss://' + backend + '/ws/game?token=' + sessionStorage.getItem('token'));
		ws.current.onopen = () => {
			console.log('ws connected');
		};

		ws.current.onclose = () => {
			window.location.href = '/';
		};

		ws.current.onmessage = (e: MessageEvent) => {
			const data = JSON.parse(e.data);
			if (data.event === 'game/state') {
				if (data.payload.me === 1) {
					data.payload.player1 = data.payload.room.player1;
					data.payload.player2 = data.payload.room.player2;
					data.payload.rounds = (data.payload.room.rounds || []).map((round: any) => {
						return {
							...round,
							player1: round.player1_result,
							player2: round.player2_result,
						};
					});
				} else {
					data.payload.player1 = data.payload.room.player2;
					data.payload.player2 = data.payload.room.player1;
					data.payload.rounds = (data.payload.room.rounds || []).map((round: any) => {
						return {
							...round,
							player1: round.player1_result,
							player2: round.player2_result,
							winner: round.winner === 1 ? 2 : round.winner === 2 ? 1 : round.winner,
						};
					});
				}
				setState(data.payload);
				if (video2.current === null && data.payload.player2 != null) {
					setTimeout(() => {
						receiveCamera();
					}, 5000);
				}
			}
		};

	};

	useEffect(() => {
		if (ws.current === null) {
			startCamera();
			startWebSocket();
		}
	}, []);

	return (
		<div className={styles.home}>
			<div className={styles.upperRow}>
				{
					state.room.countdown == -2 ? (
						<Stack gap={4}>
							<Card
								sx={{
									borderRadius: '36px',
									padding: '24px 48px',
									alignItems: 'center',
									borderColor: '#000000',
									border: 'solid',
									textAlign: 'center',
								}}
							>
								<Typography
									sx={{
										textTransform: 'uppercase',
										fontSize: '24px',
									}}
								>
									Room code
								</Typography>
								<Typography
									sx={{
										textTransform: 'uppercase',
										fontWeight: 'bold',
										fontSize: '36px',
										fontFamily: 'monospace',
										letterSpacing: '0.5em',
									}}
								>
									{state.room.pin}
								</Typography>
							</Card>
							<Button variant="outlined" onClick={startGame}>Start</Button>
						</Stack>) : (
						state.room.countdown == -1 ? (
							<Stack alignItems="center" minWidth="240px">
								<CircularProgress />
							</Stack>
						) : (
							<Typography variant="h1" align="center" minWidth="240px">{state.room.countdown}</Typography>
						)
					)
				}
				<div className={styles.detail}>
					<Stat no={1} me={state.me} player={state.player1} rounds={state.rounds} />
					<div className={styles.divider}></div>
					<Stat no={2} me={state.me} player={state.player2} rounds={state.rounds} />
				</div>
			</div>
			<div className={styles.lowerRow}>
				<Stack flex={1} justifyContent="center" alignItems="center">
					<Typography>Player 1</Typography>
					<Typography variant="h3" gutterBottom>{state.player1?.name}</Typography>
					<video ref={video} width="480" height="360" autoPlay muted></video>
				</Stack>
				<img src={ImgVs} alt="versus" width={48} height={48} style={{ alignSelf: 'center' }} />
				<Stack flex={1} justifyContent="center" alignItems="center">
					{
						state.player2 == null ? (
							<Typography>Waiting for player 2</Typography>
						) : (
							<>
								<Typography>Player 2</Typography>
								<Typography variant="h3" gutterBottom>{state.player2?.name}</Typography>
								<video ref={video2} width="480" height="360" autoPlay muted></video>
							</>
						)
					}
				</Stack>
			</div>
			{
				state.room.winner != 0 &&
				<div className={styles.modal}>
					<Typography
						variant="h1" align="center" fontWeight={600} gutterBottom
					>You {state.room?.winner == state.me ? 'wins' : 'lose'}</Typography>
					<Typography variant="h3">{state.player1?.name} {state.room.winner == state.me ? 'wins' : 'lose'}</Typography>
					<Typography variant="h3">{state.player2?.name} {state.room.winner != state.me ? 'wins' : 'lose'}</Typography>
					<Button variant="outlined" sx={{marginTop: 6}} onClick={() => window.location.href = '/'}>Rematch</Button>
				</div>
			}
		</div>
	);
};

export default Game;