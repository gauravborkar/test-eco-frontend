'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box } from '@mui/material';
import LoginForm from '../../../components/Auth/LoginForm';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    }, [router]);

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <LoginForm />
            </Box>
        </Container>
    );
}
