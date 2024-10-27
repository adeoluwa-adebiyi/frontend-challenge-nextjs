import React from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import { SurveyContext } from '../../types';

interface ReviewStepProps {
    context: SurveyContext;
}

function capitalise(text: string) {
    return text[0].toUpperCase() + text.slice(1,text.length).toLowerCase();
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ context }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <h4>Confirm your entry</h4>
        {Object.entries(context.formData).map(([title, value]) => (
            <FormControl key={title} component="fieldset">
                {Array.isArray(value) ? (
                    value.map((val, index) => (
                        <TextField
                            key={`${title}-${index}`}
                            fullWidth
                            name={title}
                            label={capitalise(title)}
                            disabled={true}
                            value={val}
                        />
                    ))
                ) : (
                    <TextField
                        fullWidth
                        name={title}
                        label={capitalise(title)}
                        disabled={true}
                        value={value as string}
                    />
                )}
            </FormControl>
        ))}
    </Box>
);
