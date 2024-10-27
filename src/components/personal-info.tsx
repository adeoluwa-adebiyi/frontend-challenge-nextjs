import React from 'react';
import { TextField, Box } from '@mui/material';
import { FormikProps } from 'formik';
import { FormData } from '../types';

interface PersonalInfoStepProps {
    formik: FormikProps<FormData>;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formik }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h4>Enter your personal details</h4>
        <TextField
            fullWidth
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
            fullWidth
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
            fullWidth
            name="email"
            placeholder="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
            fullWidth
            name="phone"
            placeholder="Phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
        />
    </Box>
);