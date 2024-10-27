import connectMongo from '@/utils/db';
import Survey, { ISurvey } from '../models/survey';
import {  Mongoose } from 'mongoose';

export class SurveyService {

    static connection: Mongoose | null = null;

    static async initConnection(){
        if(!this.connection){
            this.connection = await connectMongo()
        }
        return this.connection;
    }

    static async createSurvey(data: Partial<ISurvey>): Promise<ISurvey> {
        try {
            await this.initConnection();
            const survey = new Survey(data);
            await survey.validate();
            return await survey.save();
        } catch (error) {
            console.log("CREATE: ", error);
            throw this.handleError(error);
        }
    }

    static async getSurveyById(id: string): Promise<ISurvey | null> {
        try {
            await this.initConnection();
            return await Survey.findById(id);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private static handleError(error: any): Error {
        if (error.code === 11000) {
            return new Error('Duplicate entry found');
        }
        if (error.name === 'ValidationError') {
            return new Error(Object.values(error.errors).map(err => err.message).join(', '));
        }
        return new Error('Internal server error');
    }
}