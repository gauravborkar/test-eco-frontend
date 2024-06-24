'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Box } from '@mui/material';
import RegisterForm from '../../../components/Auth/RegisterForm';

export default function Register() {
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
                    Register
                </Typography>
                <RegisterForm />
            </Box>
        </Container>
    );
}
