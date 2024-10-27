// Survey.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Survey from '../../src/pages/survey';
import { surveyMachine } from '../../src/state/survey-machine';


jest.mock("../../src/components/survey-progress", () => {
    return {
        SurveyStepper: (props:{activeStep: string}) => {
        return <p>Progress-Bar</p>
    }}
})

describe('Survey Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('renders the survey form with personal info at beginning', () => {
        render(<Survey machine={surveyMachine} />);
        screen.debug()
        console.log(screen.queryByText('Personal Info'));
        expect(screen.queryByText("Progress-Bar")).toBeTruthy();
        expect(screen.queryByText('Enter your personal details')).toBeTruthy();
    });

    it('shows validation errors when submitting empty form', async () => {

        const { getByTestId, getAllByTestId, container, queryByText } = render(<Survey machine={surveyMachine}/>);
        
        fireEvent.click(getAllByTestId("next-btn")[0]);

        await waitFor(() =>
                expect(
                  screen.queryAllByText("Required")
                ).toHaveLength(4)
              );
    });
});