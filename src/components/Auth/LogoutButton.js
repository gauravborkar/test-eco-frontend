'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/auth/login');
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
        </Button>
    );
}
