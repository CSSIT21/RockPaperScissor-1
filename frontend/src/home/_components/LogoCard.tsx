import { Card, CardContent, CardMedia, Container, Stack, Typography } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { bgcolor, borderColor } from "@mui/system";
import React, { Component } from "react";
import RpsImage from '../../_assets/artwork/newrps.png';

const LogoCard = () => {
    return (
        <Card
            sx={{
                width: '1072px',
                height: '288px',
                borderRadius: '36px',
                padding: '0 18px 0 36px',
                display: 'flex',
                alignItems: 'center',
                marginY: '70px',
                bgcolor: '#B0B0B0',
                borderColor: '#000000',
                border: 'solid'
            }}
        >
            <CardContent>
                <Stack spacing={2}>
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '40px',
                            align: 'left'
                        }}>
                        Rock
                    </Typography>
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '40px',
                            align: 'left'
                        }}>
                        Paper
                    </Typography>
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '40px',
                            align: 'left'
                        }}>
                        Scissors
                    </Typography>
                </Stack>
            </CardContent>
            <CardMedia 
                component='img'
                height='260'
                image={RpsImage}
            />
        </Card>
    )
}

export default LogoCard