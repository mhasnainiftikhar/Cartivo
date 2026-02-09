import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const AdminPlaceholder = ({ title }) => {
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                {title}
            </Typography>
            <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3, bgcolor: 'white', border: '1px dashed #ccc' }}>
                <Typography variant="h6" color="text.secondary">
                    {title} Content Management Section
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This section is under development.
                </Typography>
            </Paper>
        </Box>
    );
};

export default AdminPlaceholder;
