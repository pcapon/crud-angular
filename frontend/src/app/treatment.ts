import { Doctor } from './doctor'

export interface Treatment {
    _id: number;
    start: string;
    end: string;
    text: string;
    doctor: Doctor;
}