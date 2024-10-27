"use client";

import React from 'react';
import { useActor } from '@xstate/react';
import { useFormik } from 'formik';
import { Card, CardContent, Container } from '@mui/material';
import { surveyMachine } from '../state/survey-machine';
import { FormData, FormStep, personalInfoSchema, salarySchema } from '../types';
import { PersonalInfoStep } from '../components/form-steps/personal-info';
import { SalaryStep } from '../components/form-steps/salary-step';
import { ReviewStep } from '../components/form-steps/review';
import { SubmittedStep } from '../components/form-steps/submitted-step';
import { NavigationButtons } from '../components/nav-buttons';
import { SurveyStepper } from '../components/survey-progress';
import * as Yup from 'yup';
import "yup-phone-lite";
import { createMachine, StateMachine } from 'xstate';

const INTEREST_OPTIONS = [
    { value: '0 - 1.000', label: '0 - 1.000' },
    { value: '1.000 - 2.000', label: '1.000 - 2.000' },
    { value: '2.000 - 3.000', label: '2.000 - 3.000' },
    { value: '3.000 - 4.000', label: '3.000 - 4.000' },
    { value: 'Mehr als 4.000', label: 'Mehr als 4.000' }
];

export interface SurveyProps {
    machine: typeof surveyMachine;
    filled?: boolean;
}

const Survey: React.FC<SurveyProps> = ({ machine, filled }) => {
    if (filled) {
        return <Container maxWidth="md" sx={{ py: 4 }}>
            <Card>
                <CardContent>
                    <SurveyStepper activeStep={4} />
                    <form data-testid="survey-form" onSubmit={(e) => { formik.handleSubmit(e) }}>
                        <SubmittedStep />
                    </form>
                </CardContent>
            </Card>
        </Container>
    }
    const [state, send] = useActor(machine);

    const currentSchema = React.useMemo(() => {
        switch (state.value) {
            case 'personalInfo':
                return personalInfoSchema;
            case 'salary':
                return salarySchema;
            default:
                return Yup.object({});
        }
    }, [state.value]);

    const formik = useFormik<FormData>({
        initialValues: state.context.formData,
        validationSchema: currentSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (state.value === 'review') {
                send({ type: 'SUBMIT', data: values });
            } else {
                send({ type: 'NEXT', data: values });
            }
        }
    });

    const handlePrevious = React.useCallback(() => {
        send({ type: 'PREV', data: formik.values });
    }, [send, formik.values]);

    const activeStep = React.useMemo(() => {
        const steps: FormStep[] = ['personalInfo', 'salary', 'review'];
        return steps.indexOf(state.value as FormStep);
    }, [state.value]);

    const renderCurrentStep = () => {
        switch (state.value) {
            case 'personalInfo':
                return <PersonalInfoStep formik={formik} />;
            case 'salary':
                return <SalaryStep formik={formik} options={INTEREST_OPTIONS} />;
            case 'review':
                return <ReviewStep context={state.context} />;
            case 'submitted':
                return <SubmittedStep />;
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Card>
                <CardContent>
                    <SurveyStepper activeStep={activeStep} />
                    <form data-testid="survey-form" onSubmit={(e) => { formik.handleSubmit(e) }}>
                        {renderCurrentStep()}
                        {state.value !== 'submitted' && (
                            <NavigationButtons
                                showPrevious={state.value !== 'personalInfo'}
                                isReviewStep={state.value === 'review'}
                                onPrevious={handlePrevious}
                            />
                        )}
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Survey;