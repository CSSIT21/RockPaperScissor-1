import { Stack, Typography } from '@mui/material';
import React from 'react';
import Result from './Result';

const Stat: React.FC<any> = ({ no, player, rounds = [] }) => {
	if (!player) {
		return <Typography flex={1} align="center" mt={3}>
			Waiting for player...
		</Typography>;
	}

	return (
		<Stack flex={1} alignItems="center">
			<Typography>Player {no} Stats</Typography>
			<Typography>{player.name}</Typography>
			<hr style={{ width: '128px', margin: '12px 0' }} />
			<Stack direction="row" alignItems="center">
				{
					rounds.map((round: any, i: number) => <Result key={i} rps={round["player" + no + "_result"]} wld={round.winner == 0 ? "Draw" : round.winner == no ? "You" : "Oppo"} />)
				}
			</Stack>
		</Stack>
	);
};

export default Stat;
