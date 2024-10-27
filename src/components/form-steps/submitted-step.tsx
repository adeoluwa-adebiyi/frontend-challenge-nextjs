import React from 'react';
import { Box, Typography } from '@mui/material';

export const SubmittedStep: React.FC = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" color="primary">
            Survey Completed!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
            Thank you for your feedback.
        </Typography>
    </Box>
);