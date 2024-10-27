import * as Yup from 'yup';
import "yup-phone-lite";

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    salary: string;
}


export const phoneValidator = Yup.string().phone("DE").required('Required');

export type SurveyEvent =
    | { type: 'NEXT'; data: Partial<FormData> }
    | { type: 'PREV'; data: Partial<FormData> }
    | { type: 'SUBMIT'; data: FormData }
    | { type: 'SAVE'; data: Partial<FormData> };

export type SurveyState =
    | { value: 'personalInfo'; context: SurveyContext }
    | { value: 'salary'; context: SurveyContext }
    | { value: 'review'; context: SurveyContext }
    | { value: 'submitted'; context: SurveyContext };

export interface SurveyContext {
    formData: FormData;
    errors?: Record<string, string>;
}

export interface SurveyMachineConfig {
    id: string;
    initial: keyof SurveyStateSchema;
    context: SurveyContext;
    states: SurveyStateSchema;
}

export interface SurveyStateSchema {
    personalInfo: {
        entry?: string[];
        on: {
            NEXT: {
                target: 'salary';
                actions: string[];
            };
        };
        exit?: string[];
    };
    salary: {
        on: {
            NEXT: {
                target: 'review';
                actions: string[];
            };
            PREV: {
                target: 'personalInfo';
                actions: string[];
            };
        };
        exit?: string[];
    };
    review: {
        on: {
            SUBMIT: {
                target: 'submitted';
                actions: string[];
            };
            PREV: {
                target: 'salary';
                actions: string[];
            };
        };
    };
    submitted: {
        type: 'final';
    };
}

export interface SalaryOption {
    value: string;
    label: string;
}

export interface SurveyProps {
    onSubmit?: (data: FormData) => void;
    initialData?: Partial<FormData>;
}

export interface StepProps {
    formik: import('formik').FormikProps<FormData>;
}

export interface ValidationSchemas {
    personalInfo: Yup.ObjectSchema<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }>;
    salary: Yup.ObjectSchema<{
        salary: string;
    }>;
}

export type FormStep = Exclude<SurveyState['value'], 'submitted'>;


export interface PersonalInfoSchemaType{
    firstName: string;
    lastName: string;
    email: string; 
    phone: string
}

export interface SalarySchemaType{
    salary: string;
}

export const personalInfoSchema = Yup.object<PersonalInfoSchemaType>({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: phoneValidator
});

export const salarySchema = Yup.object<SalarySchemaType>({
    salary: Yup.string().required("Required")
});

export interface FormStepConfig {
    label: string;
    validationSchema: Yup.ObjectSchema< PersonalInfoSchemaType| SalarySchemaType>;
}

export type FormStepConfigs = {
    [K in FormStep]: FormStepConfig;
};

export interface SurveyActions {
    loadSavedState: (context: SurveyContext, event: SurveyEvent) => Partial<SurveyContext>;
    saveFormData: (context: SurveyContext, event: SurveyEvent) => Partial<SurveyContext>;
    persistState: (context: SurveyContext, event: SurveyEvent) => void;
    handleSubmit: (context: SurveyContext, event: SurveyEvent) => void;
}

export interface UseSurveyForm {
    state: SurveyState;
    send: (event: SurveyEvent) => void;
    formik: import('formik').FormikProps<FormData>;
}

export interface ValidationError {
    field: keyof FormData;
    message: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string>;
}

export interface UseSurveyFormReturn {
    currentStep: FormStep | 'submitted';
    isFirstStep: boolean;
    isLastStep: boolean;
    isSubmitted: boolean;
    canGoBack: boolean;
    canGoForward: boolean;
    goToNext: () => void;
    goToPrevious: () => void;
    submit: () => Promise<void>;
    formData: FormData;
    errors: Record<string, string>;
}

export const STEPS: FormStep[] = ['personalInfo', 'salary', 'review'];

export const SALARY_OPTIONS: SalaryOption[] = [
    { value: '0 - 1.000', label: '0 - 1.000' },
    { value: '1.000 - 2.000', label: '1.000 - 2.000' },
    { value: '2.000 - 3.000', label: '2.000 - 3.000' },
    { value: '3.000 - 4.000', label: '3.000 - 4.000' },
    { value: 'Mehr als 4.000', label: 'Mehr als 4.000' }
];

export const isSubmittedState = (
    state: SurveyState
): state is Extract<SurveyState, { value: 'submitted' }> => {
    return state.value === 'submitted';
};

export const isFormStep = (step: string): step is FormStep => {
    return STEPS.includes(step as FormStep);
};