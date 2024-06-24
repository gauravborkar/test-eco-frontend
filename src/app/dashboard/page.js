'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import CarbonFootprint from '../../components/Dashboard/CarbonFootprint';
import Recommendations from '../../components/Dashboard/Recommendations';
import AddActivity from '../../components/Dashboard/AddActivity';
import LogoutButton from '../../components/Auth/LogoutButton';

export default function Dashboard() {
    const router = useRouter();
    const [activities, setActivities] = useState([]);
    const [totalFootprint, setTotalFootprint] = useState(0);
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
        } else {
            setToken(token);
            fetchActivities(token);
        }
    }, [router]);

    const fetchActivities = async (token) => {
        try {
            const response = await axios.get('http://localhost:8000/api/activities/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setActivities(response.data);
            calculateTotalFootprint(response.data);
        } catch (error) {
            console.error('Failed to fetch activities', error);
        }
    };

    const calculateTotalFootprint = (activities) => {
        const total = activities.reduce((acc, activity) => acc + activity.carbon_footprint, 0);
        setTotalFootprint(total);
    };

    const handleActivityAdded = () => {
        fetchActivities(token);
    };

    return (
        <Container maxWidth="md">
            {token && (
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Dashboard
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                        <Typography variant="h6" component="h2">
                            Total Carbon Footprint: {totalFootprint} kg CO2
                        </Typography>
                        <LogoutButton />
                    </Box>
                    <CarbonFootprint activities={activities} />
                    <Recommendations />
                </Box>
            )}
            {!token && (
                <Alert severity="error">Unauthorized. Please log in.</Alert>
            )}
        </Container>
    );
}
