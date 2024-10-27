import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

interface SurveyStepperProps {
    activeStep: number;
}

export const SurveyStepper: React.FC<SurveyStepperProps> = ({ activeStep }) => (
    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step>
            <StepLabel>Personal Info</StepLabel>
        </Step>
        <Step>
            <StepLabel>Salary</StepLabel>
        </Step>
        <Step>
            <StepLabel>Review</StepLabel>
        </Step>
    </Stepper>
);