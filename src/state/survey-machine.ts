"use client";

import { setup, assign } from 'xstate';
import { FormData, SurveyContext, SurveyEvent } from '../types';

const API_ENDPOINT = 'http://localhost:3000/api/survey';

const getPersistedState = (): FormData => {
    if (typeof window !== "undefined") {
        const savedState = window?.localStorage?.getItem('surveyState');
        try {
            if (savedState && savedState.length !== 0) {
                return JSON.parse(savedState);
            }
        } catch (e) {
            console.log("Cannot load state from localstorage: ", e);
        }
    }
    return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        salary: ''
    };
};

async function submitSurvey(data: FormData): Promise<void> {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(
            `/${response.status}/Failed to create survey: ${response.statusText}`
        );
    }
}

export const surveyMachine = setup({
    types: {
        context: {} as SurveyContext,
        events: {} as SurveyEvent,
    },
    actions: {
        loadSavedState: assign({
            formData: () => getPersistedState()
        }),
        saveFormData: assign({
            formData: ({ context, event }) => ({
                ...context.formData,
                ...('data' in event ? event.data : {})
            })
        }),
        persistState: ({ context, event }) => {
            const dataToSave = {
                ...context.formData,
                ...('data' in event ? event.data : {})
            };
            localStorage.setItem('surveyState', JSON.stringify(dataToSave));
        },
        handleSubmit: async({ context }) => {
                localStorage.removeItem('surveyState');
                return await submitSurvey(context.formData);
            }
        }
    }
).createMachine({
    id: 'survey',
    initial: 'personalInfo',
    context: {
        formData: getPersistedState(),
    },
    states: {
        personalInfo: {
            entry: ['loadSavedState'],
            on: {
                NEXT: {
                    target: 'salary',
                    actions: ['saveFormData', 'persistState']
                }
            },
            exit: ['persistState']
        },
        salary: {
            on: {
                NEXT: {
                    target: 'review',
                    actions: ['saveFormData', 'persistState']
                },
                PREV: {
                    target: 'personalInfo',
                    actions: ['saveFormData', 'persistState']
                }
            },
            exit: ['persistState']
        },
        review: {
            on: {
                SUBMIT: {
                    target: 'submitted',
                    actions: ['saveFormData', 'persistState', 'handleSubmit']
                },
                PREV: {
                    target: 'salary',
                    actions: ['saveFormData', 'persistState']
                }
            },
        },
        submitted: {
            type: 'final'
        }
    }
});

export type SurveyMachine = typeof surveyMachine;