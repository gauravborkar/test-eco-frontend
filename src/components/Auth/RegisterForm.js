'use client';

import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const router = useRouter();

    const validate = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            try {
                await axios.post('http://localhost:8000/api/users/register/', {
                    username,
                    email,
                    password
                });
                router.push('/auth/login');
            } catch (error) {
                setGeneralError('Registration failed. Please try again.');
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
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
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
                Register
            </Button>
        </Box>
    );
}
