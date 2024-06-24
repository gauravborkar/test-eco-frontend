'use client';

import { CssBaseline, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import Link from 'next/link';
import LogoutButton from '../components/Auth/LogoutButton';
import '../styles/globals.css';

const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

const theme = createTheme({
    palette: {
        primary: {
            main: '#4caf50',
        },
    },
});

export default function RootLayout({ children }) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="/styles/globals.css" />
            </head>
            <body>
                <EmotionCacheProvider value={clientSideEmotionCache}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    EcoTrack
                                </Typography>
                                {token ? (
                                    <>
                                        <Button color="inherit" component={Link} href="/dashboard">
                                            Dashboard
                                        </Button>
                                        <Button color="inherit" component={Link} href="/activities">
                                            Activities
                                        </Button>
                                        <LogoutButton />
                                    </>
                                ) : (
                                    <>
                                        <Button color="inherit" component={Link} href="/auth/login">
                                            Login
                                        </Button>
                                        <Button color="inherit" component={Link} href="/auth/register">
                                            Register
                                        </Button>
                                    </>
                                )}
                            </Toolbar>
                        </AppBar>
                        <Box component="main" sx={{ mt: 8 }}>
                            {children}
                        </Box>
                    </ThemeProvider>
                </EmotionCacheProvider>
            </body>
        </html>
    );
}
