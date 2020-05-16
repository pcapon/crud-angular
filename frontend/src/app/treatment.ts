import { Doctor } from './doctor'

export interface Treatment {
    id: number;
    start: string;
    end: string;
    text: string;
    doctor: Doctor;
}