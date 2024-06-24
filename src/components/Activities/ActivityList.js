'use client';

import { Typography, Box, Paper } from '@mui/material';

export default function ActivityList({ activities }) {
    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Activities
            </Typography>
            <Box>
                {activities.map((activity) => (
                    <Typography key={activity.activity_id}>
                        {activity.name}: {activity.carbon_footprint} kg CO2
                    </Typography>
                ))}
            </Box>
        </Paper>
    );
}
