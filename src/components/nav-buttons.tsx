import React from 'react';
import { Box, Button } from '@mui/material';

interface NavigationButtonsProps {
    showPrevious: boolean;
    isReviewStep: boolean;
    onPrevious: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    showPrevious,
    isReviewStep,
    onPrevious
}) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        {showPrevious && (
            <Button
                variant="outlined"
                onClick={onPrevious}
            >
                Previous
            </Button>
        )}
        <Button
            data-testid={'next-btn'}
            variant="contained"
            type="submit"
            sx={{ ml: 'auto' }}
        >
            {isReviewStep ? 'Submit' : 'Next'}
        </Button>
    </Box>
);
