'use client';

import { Typography } from '@mui/material';

export default function ActivitySummary({ totalFootprint }) {
    return (
        <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            Total Carbon Footprint: {totalFootprint} kg CO2
        </Typography>
    );
}
