import { Stack, Typography } from '@mui/material';
import React from 'react';
import Result from './Result';

const Stat: React.FC<any> = ({ no, name, rounds = [] }) => {
	return (
		<Stack flex={1} alignItems="center">
			<Typography>Player 1 Stats</Typography>
			<Typography>Jack (me)</Typography>
			<hr style={{ width: '128px', margin: '12px 0' }} />
			<Stack direction="row" alignItems="center">
				{
					rounds.map((round: any, i: number) => <Result key={i} rps={round.rps} wld={round.wld} />)
				}
			</Stack>
		</Stack>
	);
};

export default Stat;
