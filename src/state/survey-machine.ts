"use client";

import { setup, assign } from 'xstate';
import { FormData, SurveyContext, SurveyEvent } from '../types';

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
        handleSubmit: assign({
            formData: ({ context }) => {
                localStorage.removeItem('surveyState');
                return context.formData;
            }
        })
    }
}).createMachine({
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