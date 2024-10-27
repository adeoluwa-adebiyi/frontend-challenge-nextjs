import { phoneValidator } from '@/types';
import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import { v4 as uuidv4 } from "uuid";

// Interface for the Survey document
export interface ISurvey extends Document {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    salary: string;
    fullName: string; 
    createdAt: Date;
    updatedAt: Date;
}

const SurveySchema = new Schema<ISurvey>({
    uuid: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4,
        immutable: true, // Cannot be changed once set
        index: true
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: false,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: 'Invalid email format'
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        validate: {
            validator: function(value: string) {
                return phoneValidator.isValidSync(value)
            },
            message: 'Invalid phone number format'
        }
    },
    salary: {
        type: String,
        required: [true, 'Salary range is required'],
        enum: {
            values: [
                '0 - 1.000',
                '1.000 - 2.000',
                '2.000 - 3.000',
                '3.000 - 4.000',
                'Mehr als 4.000'
            ],
            message: '{VALUE} is not a valid salary range'
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
SurveySchema.index({ uuid: 1 }, { unique: true });

// Virtual for full name
SurveySchema.virtual('fullName').get(function(this: ISurvey) {
    return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware for data sanitization
SurveySchema.pre('save', function(next) {
    if (this.isNew && !this.uuid) {
        this.uuid = uuidv4();
    }
    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();
    this.email = this.email.trim().toLowerCase();
    this.phone = this.phone.trim();
    next();
});

export default mongoose.model('Survey', SurveySchema);