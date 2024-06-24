// src/components/Dashboard/AddActivity.js
'use client';

import { useState } from 'react';
import { TextField, Button, Box, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

export default function AddActivity({ onActivityAdded }) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const data = {
            name,
            carbon_footprint: calculateCarbonFootprint(type, value),
            [type]: parseFloat(value)
        };
        try {
            await axios.post('http://localhost:8000/api/activities/', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setName('');
            setType('');
            setValue('');
            onActivityAdded();
        } catch (error) {
            setError('Failed to add activity. Please try again.');
        }
    };

    const calculateCarbonFootprint = (type, value) => {
        switch (type) {
            case 'distance':
                return value * 0.2; // Example calculation for car travel
            case 'usage':
                return value * 0.475; // Example calculation for electricity
            case 'quantity':
                return value * 27; // Example calculation for beef
            case 'volume':
                return value * 0.015; // Example calculation for hot water
            default:
                return 0;
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 4 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Activity Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="activity-type-label">Activity Type</InputLabel>
                <Select
                    labelId="activity-type-label"
                    id="activity-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    label="Activity Type"
                    required
                >
                    <MenuItem value="distance">Distance (km)</MenuItem>
                    <MenuItem value="usage">Energy Usage (kWh)</MenuItem>
                    <MenuItem value="quantity">Quantity (kg)</MenuItem>
                    <MenuItem value="volume">Volume (liters)</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Value"
                fullWidth
                margin="normal"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Add Activity
            </Button>
        </Box>
    );
}
