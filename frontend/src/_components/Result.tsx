import { Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import ImgRock from '../_assets/artwork/rock.png';
import ImgPaper from '../_assets/artwork/paper.png';
import ImgScissor from '../_assets/artwork/scissor.png';

const Result: React.FC<any> = ({ rps, wld }) => {
	const img = useMemo(() => {
		switch (rps) {
			case 'rock':
				return ImgRock;
			case 'paper':
				return ImgScissor;
			case 'scissor':
				return ImgPaper;
			default:
				return null;
		}
	}, []);

	return (
		<Stack alignItems="center" mx={0.5}>
			<img src={img} alt="rps" width="42px"/>
			<Typography fontFamily="monospace">{wld}</Typography>
		</Stack>
	);
};

export default Result;
