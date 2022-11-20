import { Card, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { bgcolor, borderColor } from "@mui/system";
import React, { Component } from "react";
import Readyimg from '../../_assets/artwork/ready.png';

const ReadyCard = () => {
    return (
        <Card sx={{
            width: '350%',
            height: '70%',
            borderRadius: '36px',
            padding: '0 18px 0 36px',
            borderColor: '#000000',
            marginTop: '5%',
            marginRight: '10%',
            marginLeft: '1%',
            border: 'solid',
            textAlign: 'center',
        }}>
            <CardContent>
                <Stack spacing={2}>
            <Typography
				sx={{
					textTransform: 'uppercase',
					fontWeight: 'bold',
					fontSize: '20px',
					align: 'left'
				}}>
				Player1
			</Typography>
            <CardMedia>
                component='img'
                image={Readyimg}
            </CardMedia>
            </Stack>
            </CardContent>
        </Card>
    )
}

export default ReadyCard