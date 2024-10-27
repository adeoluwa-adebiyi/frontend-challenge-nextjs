import { SalaryStep } from "@/components/form-steps/salary-step";
import { fireEvent } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";

describe('SalaryStep Component', () => {
    const mockOptions = [
        { value: '0 - 1.000', label: '0 - 1.000' },
        { value: '1.000 - 2.000', label: '1.000 - 2.000' }
    ];

    const mockFormik = {
        values: {
            salary: ''
        },
        errors: {},
        touched: {},
        handleChange: jest.fn(),
        handleSubmit: jest.fn()
    };

    it('renders all salary options', () => {
        render(<SalaryStep formik={mockFormik} options={mockOptions} />);
        
        mockOptions.forEach(option => {
            expect(screen.getByLabelText(option.label)).toBeTruthy();
        });
    });

    it('handles salary selection', () => {
        const handleChange = jest.fn();
        render(
            <SalaryStep
                formik={{
                    ...mockFormik,
                    handleChange
                }}
                options={mockOptions}
            />
        );

        fireEvent.click(screen.getByLabelText(mockOptions[0].label));
        expect(handleChange).toHaveBeenCalled();
    });
});