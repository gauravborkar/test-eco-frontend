// src/components/Dashboard/CarbonFootprint.js
'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

export default function CarbonFootprint() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8000/api/footprints/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Fetching data failed', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Carbon Footprint
            </Typography>
            <Box>
                {data.map((entry) => (
                    <Typography key={entry.date}>
                        {entry.date}: {entry.carbon_footprint} kg CO2
                    </Typography>
                ))}
            </Box>
        </Paper>
    );
}
