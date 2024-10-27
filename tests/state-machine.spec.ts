import { surveyMachine } from "@/state/survey-machine";
import { createActor, createMachine, interpret } from "xstate";


describe('Survey Machine', () => {

    beforeAll(() => {
        // Mock localStorage
        const localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        };
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    })

    afterAll(() => {
        jest.clearAllMocks();
    })

    it('persists form data to localStorage', () => {
        const actor = createActor(surveyMachine).start();

        const testData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '1234567890'
        };

        actor.send({ type: 'NEXT', data: testData });

        expect(localStorage.setItem).toHaveBeenCalled();
        const savedData = JSON.parse(localStorage.setItem.mock.calls[0][1]);
        expect(savedData).toMatchObject(testData);
    });

    // it('loads persisted data on initialization', () => {
    //     const testData = {
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         email: 'john@example.com',
    //         phone: '1234567890'
    //     };

    //     localStorage.getItem.mockReturnValue(JSON.stringify(testData));

    //     const machine = interpret(surveyMachine).start();

    //     expect(machine.state.context.formData).toMatchObject(testData);
    // });
});