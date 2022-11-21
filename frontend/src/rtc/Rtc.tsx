import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { caller, useAxios } from '../_utils/api';
import GridImg from '../_assets/artwork/grid.svg';

const Rtc = () => {
	const axios = useAxios();
	const [loading, setLoading] = useState(false);
	const [snapshot, setSnapshot] = useState<null | string>(null);
	const video = useRef<HTMLVideoElement>(null);

	const createSession = (mode: 'sender' | 'receiver') => {
		const pc = new RTCPeerConnection({
			iceServers: [
				{
					urls: 'stun:stun.l.google.com:19302',
				},
			],
		});

		pc.oniceconnectionstatechange = e => console.log(pc.iceConnectionState);
		pc.onicecandidate = event => {
			if (event.candidate === null) {
				caller<any>(
					axios.post(
						`/rtc/offer/${mode}`,
						{
							description: btoa(JSON.stringify(pc.localDescription)),
						},
					),
				).then((res) => {
					try {
						pc.setRemoteDescription(JSON.parse(atob(res.data.answer))).then(void (0));
					} catch (e) {
						alert(e);
					}
				});
			}
		};

		if (mode === 'sender') {
			navigator.mediaDevices.getUserMedia({ video: true, audio: false })
				.then(stream => {
					stream.getTracks().forEach(track => pc.addTrack(track, stream));
					video.current!.srcObject = stream;
					pc.createOffer()
						.then(d => pc.setLocalDescription(d));
				});
		} else {
			pc.addTransceiver('video');
			pc.createOffer()
				.then(d => pc.setLocalDescription(d))
				.catch((err) => console.log(err));

			pc.ontrack = function (event) {
				video.current!.srcObject = event.streams[0];
				video.current!.autoplay = true;
				video.current!.controls = true;
			};
		}
	};

	const snap = () => {
		setSnapshot(null);
		setLoading(true);
		axios.get(
			`/rtc/snapshot/detail`,
			{
				responseType: 'text',
			},
		).then((res) => {
			console.log(res.data);
			setSnapshot(res.data);
		});
	};

	return (<Stack
		alignItems="center"
		justifyContent="center"
		minHeight="100vh"
		sx={{ background: `url('${GridImg}')`, backgroundSize: 'cover' }}
	>
		{
			snapshot === null ? <>
					{
						loading ? <Box>
								<CircularProgress />
							</Box> :
							<>
								<video ref={video} width="480" height="360" autoPlay muted></video>
								<br />
								<Button className="createSessionButton" onClick={() => createSession('sender')}>
									Publish a Broadcast
								</Button>
								<Button className="createSessionButton" onClick={() => createSession('receiver')}>
									Join a Broadcast
								</Button>
								<Button onClick={() => snap()}> Snapshot</Button>
							</>
					}
				</> :
				<>
					<img src="https://macbookpro.lan.bsthun.com:3001/api/rtc/snapshot/image" />
					<Typography>
						<b>Result</b>
						{snapshot.split(' ')[4]}</Typography>
					<Button onClick={() => snap()}> Retake</Button>
				</>
		}
	</Stack>);
};

export default Rtc;
