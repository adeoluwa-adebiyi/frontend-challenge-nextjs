import React from 'react';
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';
import { FormikProps } from 'formik';
import { FormData, SalaryOption } from '../../types';

interface SalaryStepProps {
    formik: FormikProps<FormData>;
    options: SalaryOption[];
}

export const SalaryStep: React.FC<SalaryStepProps> = ({ formik, options }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <h4>Indicate your salary expectation</h4>
        <FormControl error={formik.touched.salary && Boolean(formik.errors.salary)}>
            <FormLabel>Salary Indication</FormLabel>
            <RadioGroup
                name="salary"
                value={formik.values.salary}
                onChange={formik.handleChange}
            >
                {options.map((option) => (
                    <FormControlLabel 
                        key={option.value} 
                        label={option.label} 
                        control={<Radio />} 
                        value={option.value} 
                    />
                ))}
            </RadioGroup>
            <FormHelperText>
                {formik.touched.salary && formik.errors.salary}
            </FormHelperText>
        </FormControl>
    </Box>
);