'use client';

import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const router = useRouter();

    const validate = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:8000/api/users/login/', {
                    username,
                    password
                });
                localStorage.setItem('token', response.data.access);
                router.push('/dashboard');
            } catch (error) {
                setGeneralError('Login failed. Please check your credentials.');
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            {generalError && <Alert severity="error">{generalError}</Alert>}
            <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={Boolean(errors.username)}
                helperText={errors.username}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
            />
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </Box>
    );
}
