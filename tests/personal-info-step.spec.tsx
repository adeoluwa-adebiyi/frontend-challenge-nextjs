import { PersonalInfoStep } from "@/components/personal-info";
import { render, screen } from "@testing-library/react";


describe('PersonalInfoStep Component', () => {
    const mockFormik = {
        values: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        errors: {},
        touched: {},
        handleChange: jest.fn(),
        handleSubmit: jest.fn()
    };

    it('renders all required fields', () => {
        render(<PersonalInfoStep formik={mockFormik} />);
        
        expect(screen.getByPlaceholderText('First Name')).toBeTruthy();
        expect(screen.getByPlaceholderText('Last Name')).toBeTruthy();
        expect(screen.getByPlaceholderText('Email')).toBeTruthy();
        expect(screen.getByPlaceholderText('Phone')).toBeTruthy();
    });

    it('shows validation errors when fields are touched', () => {
        const formikWithErrors = {
            ...mockFormik,
            errors: {
                firstName: 'Required',
                lastName: 'Required'
            },
            touched: {
                firstName: true,
                lastName: true
            }
        };

        render(<PersonalInfoStep formik={formikWithErrors} />);
        expect(screen.getAllByText('Required')).toHaveLength(2);
    });
});
