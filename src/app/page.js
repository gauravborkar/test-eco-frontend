// src/app/page.js
import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
    return (
        <Container>
            <Typography variant="h3" component="h1" gutterBottom>
                Welcome to EcoTrack
            </Typography>
            <Link href="/auth/register" passHref>
                <Button variant="contained" color="primary">
                    Get Started
                </Button>
            </Link>
        </Container>
    );
}