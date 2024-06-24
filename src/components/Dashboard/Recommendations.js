// src/components/Dashboard/Recommendations.js
'use client'; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

export default function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8000/api/pynamo-recommendations/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRecommendations(response.data);
            } catch (error) {
                console.error('Fetching recommendations failed', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Recommendations
            </Typography>
            <Box>
                {recommendations.map((recommendation) => (
                    <Typography key={recommendation.created_at}>
                        {recommendation.text}
                    </Typography>
                ))}
            </Box>
        </Paper>
    );
}