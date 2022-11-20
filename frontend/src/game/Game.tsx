import React, { useEffect, useRef } from 'react';
import { Box, Card, Stack, Typography } from '@mui/material';
import Stat from '../_components/Stat';

import styles from './Game.module.scss';
import ImgVs from '../_assets/artwork/vs.png'

const Game = () => {
	const video = useRef<HTMLVideoElement>(null);
	const video2 = useRef<HTMLVideoElement>(null);

	const startCamera = () => {
		const pc = new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:stun.l.google.com:19302',
				},
			],
		});

		navigator.mediaDevices.getUserMedia({ video: true, audio: false })
			.then((stream) => {
				stream.getTracks().forEach(track => pc.addTrack(track, stream));
				video.current!.srcObject = stream;
				pc.createOffer()
					.then(d => pc.setLocalDescription(d));
			});
	};

	useEffect(() => {
		startCamera();
	}, []);

	return (
		<div className={styles.home}>
			<div className={styles.upperRow}>
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
						123456
					</Typography>
				</Card>
				<div className={styles.detail}>
					<Stat />
					<div className={styles.divider}></div>
					<Stat />
				</div>
			</div>
			<div className={styles.lowerRow}>
				<Stack flex={1} justifyContent="center" alignItems="center">
					<Typography>Player 1</Typography>
					<Typography variant="h3" gutterBottom>Jack</Typography>
					<video ref={video} width="480" height="360" autoPlay muted></video>
				</Stack>
				<img src={ImgVs} alt="versus" width={48} height={48} style={{alignSelf: 'center'}}/>
				<Stack flex={1} justifyContent="center" alignItems="center">
					<Typography>Player 1</Typography>
					<Typography variant="h3" gutterBottom>Kainui</Typography>
					<video ref={video2} width="480" height="360" autoPlay muted></video>
				</Stack>
			</div>
		</div>
	);
};

export default Game;